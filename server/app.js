import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

//need this else env variables wont be loaded. and are undefined. hence fail silently w/o error 
dotenv.config({
    path:'./.env'
})
console.log(process.env.CORS_ORIGIN)
const app=express()
app.use((req, res, next) => {
  console.log("Incoming Request Origin:", req.headers.origin);
  next();
});
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-github-token"],
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js';
import billRouter from "./routes/bill.routes.js";
//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/bills",billRouter)
export {app}