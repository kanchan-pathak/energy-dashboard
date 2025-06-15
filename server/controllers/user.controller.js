import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";

import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
const registerUser=asyncHandler( async(req,res)=>{

    console.log("request body: " + JSON.stringify(req.body));


    const {fullname,username,email,password}=req.body

    if(
        [fullname,username,email,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"Please enter all fields")
    }
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"username or email already exists")
    }
    
    const user= await User.create({
        fullname,
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser=await User.findById(user._id).select(
        //negative sign to say that we dont need this in response
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");
    }
    //craft a response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"Succesfully Registered!")
    )
})

const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
        
    } catch (error) {
        throw new ApiError(500,"token generation failure")
    }
}

const loginUser=asyncHandler(async(req,res) =>{
//check if username/email is written and exists in db
//check if password is written and matches
console.log("login body: ",req.body)
const {username,email,password}=req.body

if(!username && !email){
    throw new ApiError(400,"Please enter email or username");
}
const user=await User.findOne({
    $or:[{username},{email}]
})
if(!user){
    throw new ApiError(404,"User does not exist")
}
const isPasswordValid= await user.isPasswordCorrect(password);
if(!isPasswordValid){
    throw new ApiError(401,"Password is incorrect")
}

const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
console.log("these are tokens: ",accessToken,"  ",refreshToken)
const loggedUser= await User.findById(user._id).select("-password -refreshToken")
const options={
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite: 'Lax'
}
return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(
        200,
        {
            user:loggedUser,
            accessToken:accessToken,
            refreshToken:refreshToken
        },
        "User logged in successfully"
    )
)
})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
         //unset operator by mongodb. changes the database
         $unset:{
            refreshToken:1
         }
        },
        {
            //if this method should return old or updated doc
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User Logged Out"))
})

const refreshAccessToken= asyncHandler(async(req,res)=>{
    try {
        const incomingRefreshToken=req.cookies?.refreshToken || req.body.refreshToken
        
        if(!incomingRefreshToken){
            throw new ApiError(401,"unauthorized request")
        }
        const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user=await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401,"invalid refresh token")
        }
        if(incomingRefreshToken !==user?.refreshToken){
            throw new ApiError(401,"Refresh token expired or used")
        }
        const options={
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: 'Lax'
        }
        
        const {newaccessToken,newrefreshToken}= await generateAccessAndRefreshToken(user._id)
        
        return res
        .status(200)
        .clearCookie("accessToken",newaccessToken,options)
        .clearCookie("refreshToken",newrefreshToken,options)
        .json(
            new ApiResponse(200,{accessToken:newaccessToken,refreshToken:newrefreshToken},"New refresh token generated"))
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid access token")
    }
})

const changeCurrentPassword=asyncHandler(async (req,res) => {
    const {oldPassword,newPassword}=req.body
    const user=await User.findById(req.user?._id)
    const isPasswordRight= await user.isPasswordCorrect(oldPassword)
    if(!isPasswordRight){
        throw new ApiError(400,"Invalid old password")
    }

    user.password(newPassword);
    await user.save({validateBeforeSave:false});
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully!"))
})

const getCurrentUser=asyncHandler(async (req,res) => {
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"Current user fetched successfully!"))
})

const updateAccountDetails=asyncHandler(async (req,res) => {
    const {fullname,email}=req.body
    if(!fullname || !email){
        throw new ApiError(400,"Both fullname and email are required")
    }
    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullname,
                email
            }
        },
        {new:true}
    ).select("-password")
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))

})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails
}