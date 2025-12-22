import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:{type: String, required:true},
        difficulty:{type: String, enum:["easy","medium","hard"],required:true},
        weight:{type:Number, required:true},
        groupId:{type: mongoose.Schema.Types.ObjectId, ref:"Group"},
        assignedTo:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
        status:{type: String, enum:["pending","completed"], default:"pending"}
    },
    {
        timestamps:true
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;