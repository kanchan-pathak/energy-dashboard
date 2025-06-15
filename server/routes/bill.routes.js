import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
// import {
//     publishAVideo,
//     getVideoById,
//     updateVideo,
//     deleteVideo,
//     getAllVideos
//  } from "../controllers/video.controller.js";
import {
   publishABill,
   getUserBills
   } from "../controllers/bill.controller.js";

const router=Router();

router.route("/uploadbill").post(verifyJWT,publishABill)
router.route("/mybills").get(verifyJWT, getUserBills)

// router.route("/c/:videoId").get(getVideoById)
// router.route("/delete-video/:videoId").delete(verifyJWT,deleteVideo)
// router.route("/get-all-videos").get(getAllVideos)
export default router