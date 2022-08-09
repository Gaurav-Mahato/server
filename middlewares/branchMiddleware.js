import pool from "../config/db.js";

const getBranch = (req,res,next) => {
    const {branch_access, zone_access, plant_access} = req.user
    const {zoneDetails} = req
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }
        else{
            if(plant_access>0){ // plant official
                req.branchDetails = 'NOT PERMITTED'
                next()
            }
            else if(zone_access > 0){ // zone official
                const query = `SELECT * from branch where zone=?`
                conn.query(query,[zone_access],(error,result) => {
                    if(error){
                        res.status(404).send({
                            message: error
                        })
                    }
                    else{
                        const sendingData = JSON.parse(JSON.stringify(result))
                        req.branchDetails = sendingData
                        next()
                    }
                    conn.release()
                })
            }
            else if(zone_access === 0){ // Head office
                const query = `SELECT * FROM branch`
                conn.query(query,(error,result) => {
                    conn.release()
                    if(error){
                        res.status(404).send({
                            message: error
                        })
                    }
                    else{
                        req.branchDetails = result
                        next()
                    }
                    conn.release()
                })
            }
            else if(branch_access>0){  //Branch Official
                const query = `SELECT * FROM branch where id=?`
                conn.query(query,[branch_access],(error,result) => {
                    if(error){
                        res.status(404).send({
                            message: error
                        })
                    }else{
                        req.branchDetails = result
                        next()
                    }
                    conn.release()
                })
            }
        }
    })
}

export {getBranch}