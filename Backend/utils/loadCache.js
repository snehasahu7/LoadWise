import redisClient from "../config/redis.js";
import Task from "../models/Tasks.js";

export const getUserLoad = async(userId)=>{
  const cacheKey = `user_load:${userId}`;
  const cachedLoad = await redisClient.get(cacheKey);
  if(cachedLoad!==null){
    return Number(cachedLoad);
  }

  const result = await Task.aggregate([
    { $match: { assignedTo: userId, status: "pending" } },
    { $group: { _id: null, total: { $sum: "$weight" } } }
  ]);

  const load = result[0]?.total||0;

  await redisClient.set(cacheKey,load);
  return load;
};

export const updateUserLoad = async(userId, delta)=>{
   const cacheKey = `user_load:${userId}`;
   await redisClient.incrBy(cacheKey, delta);
};