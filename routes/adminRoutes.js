import express from "express"
import { loginUser, registerUser, updateZone } from "../controllers/adminController.js"
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/update").post(updateZone)
router.route("/login").post(loginUser)

export default router