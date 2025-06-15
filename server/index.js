import dotenv from "dotenv"
// import 'dotenv/config';
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config({
    path:'./.env'
})
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("error: ",error)
        throw error
    });
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("MongoDB connection failed")
})