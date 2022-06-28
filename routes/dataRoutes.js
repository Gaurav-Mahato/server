import express from "express"
const router = express.Router()
import { getZone } from "../middlewares/zoneMiddleware.js"
import { getPlant } from "../middlewares/plantMiddleware.js"
import {getBranch} from "../middlewares/branchMiddleware.js"
import {sendData} from "../controllers/dataController.js"
import protectUser from "../middlewares/userAuthMiddleware.js"

router.route('/').get(protectUser,getZone,getBranch,getPlant,sendData)

export default router