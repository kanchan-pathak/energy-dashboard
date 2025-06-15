import mongoose from "mongoose";
const DB_NAME="energy-dashboard"
//async fns return promises
const connectDB=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected! Db Host: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MONGODB connection error ",error);
        process.exit(1);
    }
}

export default connectDB