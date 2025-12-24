import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL
});
redisClient.on("error",(err)=>{
    console.log("Redis error:",err);
});
redisClient.on("connect", () => console.log("Redis Client Connecting..."));
redisClient.on("ready", () => console.log("Redis Client Ready!"));
await redisClient.connect();

export default redisClient;