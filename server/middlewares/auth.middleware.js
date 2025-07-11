import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT= asyncHandler(async(req,res,next)=>{
    //from web or from mobile
    try {
        //console.log("cookies",req.cookies);
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401,"unauthorized request")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"invalid access token")
        }
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid access token")
    }
})