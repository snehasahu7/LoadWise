import express from "express";
import Group from "../models/Group.js";
import authmiddleware from "../middleware/auth.js";
import crypto from "crypto";

const router = express.Router();

router.post("/",authmiddleware, async(req, res)=>{
    try{
    const inviteCode = crypto.randomBytes(4).toString("hex");
    const group = Group.create({
        name:req.body.name,
        inviteCode,
        createdBy:req.userId,
        members:[req.userId]
    });
    res.status(201).json(group);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
});

router.get("/", authmiddleware, async(req,res)=>{
    try{
        const group = await Group.find({createdBy:req.userId});
        res.json({group});
    }
    catch(error){
         res.status(500).json({error:error.message});
    }
});

router.post("/join/:inviteCode",authmiddleware,async(req,res)=>{
    try{
        const group = await Group.findOne({inviteCode:req.params.inviteCode});
        if(!group){
            res.status(404).json({message:"Invalid invite code"});
        }
        if(group.members.includes(req.userId)){
            res.status(400).json({message:"Already a member!"});
        }
        group.members.push(req.userId);
        await group.save();
        res.json({message:"Joined group successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

export default router;