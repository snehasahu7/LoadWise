import jwt from "jsonwebtoken";

const authmiddleware = (req, res, next)=>{
    const jwtheaders = req.headers.authorization;
    if(!jwtheaders || !jwtheaders.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized! "});
    }
    const token = jwtheaders.split(" ")[1];
    try{
        const verifytoken = jwt.verify(token,process.env.JWT_SECRET);
        red.userId = verifytoken.userId;
        next();
    }
    catch(error){
        return res.status(401).json({error:error.message});
    }
}

export default authmiddleware;