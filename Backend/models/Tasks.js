import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:{type: String, required:true},
        difficulty:{type: String, enum:["easy","medium","hard"],required:true},
        weight:{type:Number, required:true},
        groupId:{type: mongoose.Schema.Types.ObjectId, ref:"Group",index: true},
        assignedTo:{type: mongoose.Schema.Types.ObjectId, ref:"User", index: true},
        status:{type: String, enum:["pending","completed"], default:"pending", index: true},
        createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"User",required:true, index:true},
    },
    {
        timestamps:true
    }
);

taskSchema.index({ assignedTo: 1, status: 1 });



const Task = mongoose.model("Task", taskSchema);

export default Task;