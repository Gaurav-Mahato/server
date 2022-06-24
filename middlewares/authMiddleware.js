import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import pool from "../config/db.js";

const protect = asyncHandler(async(req,res,next) => {
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
                    const query = `SELECT admin_id,name,email FROM admin WHERE admin_id=?`
                    conn.query(query,[decoded.id], (error,result) => {
                        conn.release()
                        if(error){
                            res.status(401).send({
                                message: 'Unauthorized'
                            })
                        }
                        else{
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

export default protect;