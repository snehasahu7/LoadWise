import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Task from "../models/Tasks.js";
import Group from "../models/Group.js";

const router = express.Router();

router.post("/register", async (req, res)=>{
    try{
        const {name, email, password} = req.body;

    const finduser = await User.findOne({email});
    if(finduser){
        return res.status(400).json({message:"User already exist!"})
    }

    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password: hashpassword
    });

    return res.status(200).json({message:"Hurrayy User registered Successfully!"});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
    
});

router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const userfind = await User.findOne({email});
        if(!userfind){
            return res.status(400).json({message:"Invalid Credentials, User does not exist"});
        }

        const hashpass = await bcrypt.compare(password, userfind.password);
        if(!hashpass){
            return res.status(400).json({message:"Incorrect Password"});
        }

        const token = jwt.sign(
            {userId: userfind._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.json({token});

    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default router;