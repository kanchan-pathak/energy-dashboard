import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
   publishABill,
   getUserBills,
   updateBill
   } from "../controllers/bill.controller.js";

const router=Router();

router.route("/uploadbill").post(verifyJWT,publishABill)
router.route("/mybills").get(verifyJWT, getUserBills)
router.route("/updatebill/:id").post(verifyJWT,updateBill)

export default router