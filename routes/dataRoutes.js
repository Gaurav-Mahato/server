import express from "express"
import { getZone } from "../middlewares/zoneMiddleware.js"
import { getPlant } from "../middlewares/plantMiddleware.js"
import {getBranch} from "../middlewares/branchMiddleware.js"
import {sendData, zoneGetter, branchGetter, plantGetter, getZones, getBranches} from "../controllers/dataController.js"
import protectUser from "../middlewares/userAuthMiddleware.js"

const router = express.Router()

router.route('/').get(protectUser,getZone,getBranch,getPlant,sendData)
router.route('/branch').post(protectUser,branchGetter)
router.route('/zone').post(protectUser,zoneGetter)
router.route('/plant').post(protectUser,plantGetter)
router.route('/get-zone').get(getZones)
router.route('/get-branch/:zone').get(getBranches)

export default router