import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import pool from "../config/db.js"

const registerUser = asyncHandler(async(req,res) => {
    const salt = await bcrypt.genSalt(10)
    const {name, password,email} = req.body
    const hashedPassword = await bcrypt.hash(password, salt)
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }
        else{
            const query = `INSERT INTO admin(name, password, email) VALUES(?, ?, ?)`
            conn.query(query, [name,hashedPassword,email],(error, result) => {
                conn.release()
                if(error){
                    console.log(error)
                }
                console.log(result)
            })
        }
    })
})

export {registerUser}