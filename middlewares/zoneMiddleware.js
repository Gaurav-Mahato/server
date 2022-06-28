import pool from "../config/db.js";
import { arrayMaker, valueMaker } from "../utils/dataGenerator.js";

const getZone = (req,res,next) => {
    const {zone_access} = req.user
    pool.getConnection((err, conn) => {
        if(err){
            throw err
        }
        else{
            if (zone_access>0){ // Zone official
                const query = `SELECT * FROM zone WHERE zone_id=?`
                conn.query(query,[zone_access],(error, result) => {
                    conn.release()
                    if(error){
                        res.status(404).send({error}) 
                    }
                    else{
                        const sendingData = JSON.parse(JSON.stringify(result))
                        req.zoneDetails = sendingData
                        next()
                    }
                })
            }
            else if(zone_access === -1){ // Lower than zone
                req.zoneDetails = 'NOT PERMITTED'
                next()
            }
            else if(zone_access === 0){ // Head office
                const query = `SELECT * FROM zone`
                conn.query(query,(error, result) => {
                    conn.release()
                    if(error){
                        res.status(404).send({error}) 
                    }
                    else{
                        const sendingData = JSON.parse(JSON.stringify(result))
                        req.zoneDetails = sendingData
                        next()
                    }
                })
            } 
        }
    })
}

export {getZone}