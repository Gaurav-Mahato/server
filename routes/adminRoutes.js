import express from "express"
import { loginAdmin, registerAdmin, updateZone } from "../controllers/adminController.js"
import protect from "../middlewares/authMiddleware.js"
const router = express.Router()

router.route("/register").post(registerAdmin)
router.route("/update").post(protect,updateZone)
router.route("/login").post(loginAdmin)

export default router