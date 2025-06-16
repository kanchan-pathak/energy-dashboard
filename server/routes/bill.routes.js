import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
   publishABill,
   getUserBills,
   updateBill,
   filterBills
   } from "../controllers/bill.controller.js";

const router=Router();

router.route("/uploadbill").post(verifyJWT,publishABill)
router.route("/mybills").get(verifyJWT, getUserBills)
router.route("/updatebill/:id").post(verifyJWT,updateBill)
router.get("/filter", verifyJWT, filterBills);

export default router