import express from "express"
import { loginAdmin, registerAdmin, updateBranch, updatePlant, updateZone } from "../controllers/adminController.js"
import protect from "../middlewares/authMiddleware.js"
const router = express.Router()

router.route("/register").post(registerAdmin)
router.route("/update").post(protect,updateZone)
router.route("/login").post(loginAdmin)
router.route('/update/branch').post(protect, updateBranch)
router.route('/update/plant').post( updatePlant)

export default router