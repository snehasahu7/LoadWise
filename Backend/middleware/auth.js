import jwt from "jsonwebtoken";

const authmiddleware = (req, res, next)=>{
    const jwtheaders = req.headers.authorization;
    if(!jwtheaders){
        return res.status(401).json({message:"Authorization header missing!"});
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