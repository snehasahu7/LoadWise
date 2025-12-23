import mongoose from "mongoose";
import User from "./User.js";

const groupSchema = new mongoose.Schema(
    {
        name :{type:String, required:true},
        inviteCode:{type:String, required:true, unique:true, index:true},
        createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"User",required:true, index:true},
        members:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
    },
    {
        timestamps:true
    }
);

const Group = mongoose.model("Group",groupSchema);
export default Group;