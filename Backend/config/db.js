import mongoose, { connect } from "mongoose";

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB Conneted");
    }
    catch(error){
        console.log("MongoDb connection failed - ", error);
        process.exit(1);
    }
}

export default connectdb;