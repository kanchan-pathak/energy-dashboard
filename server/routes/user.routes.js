import {Router} from "express";
import
{
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails
}
from "../controllers/user.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
 
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secure pathways. where we check if they have access to this route
router.route("/logout").post(verifyJWT,logoutUser)


router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").post(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)

export default router