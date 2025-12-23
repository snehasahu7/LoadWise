import express from "express";
import Group from "../models/Group.js";
import Task from "../models/Tasks.js";
import authmiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/",authmiddleware, async(req,res)=>{
    try{
        const {title, difficulty, weight, groupId, assignedTo }=req.body;

        if(groupId){
            const group= await Group.findOne({_id:groupId,members:req.userId});
            if(!group){
                res.status(403).json({messag:"Not authorized for this group"});
            }
        }

        const task = await Task.create({
            title,
            difficulty,
            weight,
            groupId,
            assignedTo,
            createdBy:req.userId
        });
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
    try{
        const task = await Task.findOneAndUpdate({
            _id:req.params.id,
            createdBy:req.userId
        },{status:"Completed"},{new:true});
        if(!task){
            res.status(404).json({message:"Task not found"});
        }
        res.json(task);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

export default router;