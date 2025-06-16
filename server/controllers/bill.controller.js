import mongoose from "mongoose"
import {Bill} from "../models/bill.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const publishABill = asyncHandler(async (req, res) => {
    
    const { type, amount, dueDate, isPaid} = req.body
    console.log("We are inside upload bill function")
   if (!type || typeof type !== "string" || type.trim() === "") {
  throw new ApiError(400, "Invalid or missing bill type.");
}

if (amount === undefined || isNaN(amount)) {
  throw new ApiError(400, "Invalid or missing amount.");
}

if (!dueDate || isNaN(Date.parse(dueDate))) {
  throw new ApiError(400, "Invalid or missing due date.");
}

if (typeof isPaid !== "boolean") {
  throw new ApiError(400, "Invalid or missing isPaid value.");
}

    const uploadedBill=await Bill.create(
        {
            type,
            amount,
            dueDate,
            isPaid,
            owner:req.user._id,
        }
    )
    if(!uploadedBill){
        throw new ApiError(500,"Something went wrong while uploading the bill");
    }
    //craft a response to show user
    return res.status(201).json(
        new ApiResponse(200,uploadedBill,"Succesfully uploaded the bill!")
    )
    
})

const getUserBills = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("inside get user bill function")
  const bills = await Bill.find({ owner: userId }).sort({ dueDate: -1 });

  if (!bills || bills.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, [], "No bills found for this user.")
    );
  }
  console.log("bills:" ,bills)
  return res.status(200).json(
    new ApiResponse(200, bills, "Fetched user bills successfully.")
  );
});

const updateBill = asyncHandler(async (req, res) => {
  const billId = req.params?.id
  const userId = req.user._id 
  const bill = await Bill.findOne({ _id: billId, owner: userId })
  console.log("bill id", billId )
  console.log("user id", userId )
  if (!bill) {
    throw new ApiError(404,"Bill not found")
  }

  const { type, amount, dueDate, isPaid } = req.body

  bill.type = type || bill.type
  bill.amount = amount || bill.amount
  bill.dueDate = dueDate || bill.dueDate
  bill.isPaid = typeof isPaid === "boolean" ? isPaid : bill.isPaid

  const updatedBill = await bill.save()

  res.status(200).json(
    new ApiResponse(200,updatedBill,"Bill updated successfully")
  )
})


export {
    publishABill,
    getUserBills,
    updateBill
}