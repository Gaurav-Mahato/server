import pool from "../config/db.js"

const getPlant = (req,res,next) => {
    const {zone_access, branch_access, plant_access} = req.user
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            if(plant_access>0){ //plant official
                const query = `SELECT * FROM plant WHERE plant_id=?`
                conn.query(query,[plant_access], (error,result) => {
                    conn.release()
                    if(error){
                        res.status(404).send({
                            message: error
                        })
                    }
                    else{
                        req.plantDetails = result
                        next()
                    }
                })
            }
            else if(branch_access>0){ // branch official
                const query = `SELECT * FROM plant WHERE branch=?`
                conn.query(query,[branch_access], (error, result) => {
                    conn.release()
                    if(error){
                        res.status(404).send({
                            message: error
                        })
                    }
                    else{
                        req.plantDetails = result
                        next()
                    }
                })
            }
            else if(zone_access>0){ // zone official
                const ids = req.branchDetails.map(branch => branch.id)
                let str=""
                for(let i=0;i<ids.length;i++){
                    str=str+`OR branch=${ids[i]} `
                }
                const query = `SELECT * FROM plant WHERE ${str.slice(3)}`
                conn.query(query,(error, result) => {
                    conn.release()
                    if(error){
                        res.status(404).send({
                            message: error
                        })
                    }
                    else{
                        req.plantDetails = result
                        next()
                    }
                })
            } 
            else if(zone_access === 0){ // Head office
                const query = `SELECT * FROM plant`
                conn.query(query, (error, result) => {
                    if(error){
                        res.status(404).send({
                            message: error
                        })
                    }else{
                        req.plantDetails = result
                        next()
                    }
                })
            }
        }
    })
}

export {getPlant}