import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import pool from "../config/db.js";

const protectUser = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers.authorization){
        try{
            token = req.headers.authorization
            const decoded = jwt.verify(token,process.env.SECRET)
            pool.getConnection((err,conn) => {
                if(err){
                    throw err
                }
                else{
                    const query = `SELECT zone_access,branch_access,plant_access FROM users WHERE user_id=?`
                    conn.query(query,[decoded.id], (error,result) => {
                        conn.release()
                        if(error){
                            res.status(401).send({
                                message: 'Unauthorized'
                            })
                        }
                        else{
                            req.user = result[0]
                            next()
                        }
                    })
                }
            })
        }catch(error){
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } 
    else{
        res.status(401);
        throw new Error('Not authorized, no tokens');
    }
})

export default protectUser;