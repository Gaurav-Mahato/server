import express from "express"
import { loginUser, registerUser, updateZone } from "../controllers/adminController.js"
import protect from "../middlewares/authMiddleware.js"
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/update").post(protect,updateZone)
router.route("/login").post(loginUser)

export default router