import express from "express"
const router = express.Router()
import { getZone } from "../middlewares/zoneMiddleware.js"
import { getPlant } from "../middlewares/plantMiddleware.js"
import {getBranch} from "../middlewares/branchMiddleware.js"
import {sendData} from "../controllers/dataController.js"

router.route('/').get(getZone,getBranch,getPlant,sendData)

export default router