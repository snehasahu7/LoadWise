import express from "express";
import Group from "../models/Group.js";
import Task from "../models/Tasks.js";
import authmiddleware from "../middleware/auth.js";
import { getUserLoad, updateUserLoad } from "../utils/loadCache.js";

const router = express.Router();

router.post("/",authmiddleware, async(req,res)=>{
    try{
        const {title, difficulty, weight, groupId}=req.body;
        let selectedUser = req.userId;
        if(groupId){
            const group= await Group.findOne({_id:groupId,members:req.userId}).populate("members");
            if(!group){
               return res.status(403).json({messag:"Not authorized for this group"});
            }
            let minload = Infinity;
            

            for(const member of group.members){
                const load = await getUserLoad(member._id);
                if(load < minload){
                    minload = load;
                    selectedUser = member._id;
                }
            }
        }

        

        const task = await Task.create({
            title,
            difficulty,
            weight,
            groupId,
            assignedTo:selectedUser,
            createdBy:req.userId
        });

        await updateUserLoad(selectedUser, weight);
        res.status(201).json(task);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

router.get("/",authmiddleware,async(req,res)=>{
    try{
        const task = await Task.find({createdBy:req.userId});
        res.json(task);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

router.patch("/:id/completed",authmiddleware, async(req,res)=>{
   try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.status === "completed") {
      return res.status(400).json({ message: "Already completed" });
    }

    task.status = "completed";
    await task.save();

    await updateUserLoad(task.assignedTo, -task.weight);

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;