import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authroutes from "./routes/auth.js";
import grouproutes from "./routes/group.js";
import taskroutes from "./routes/tasks.js";

dotenv.config();

const app = express();


const port = 3000;
app.use(cors());
app.use(express.json());
connectdb();
app.use("/auth", authroutes);
app.use("/groups",grouproutes);
app.use("/tasks",taskroutes);
app.get("/", (req,res)=>{
    res.send("Backend Running successfully");
});

app.listen(port,()=>{
    console.log(`Server running on port ${port} `)
});
