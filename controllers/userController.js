import asyncHandler from "express-async-handler"
import pool from "../config/db.js"
import crypto from "crypto"
import generateToken from "../utils/generateToken.js"

const registerUser = asyncHandler(async(req,res) => {
    const {name, password,email,role,zone_access, branch_access, plant_access} = req.body
    const key = crypto.pbkdf2Sync(password,process.env.SALT, 20000,32,'sha256');
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }
        else{
            const get = `SELECT * FROM users WHERE email=?`
            conn.query(get,[email],(err,result) => {
                if(err){
                    res.status(400).send(err)
                }else{
                    // res.send({
                    //     message: "User registered successfully"
                    // })
                    if(result.length > 0){
                        res.status(401).send({
                            message: "User has already registered"
                        })
                    }else{
                        const query = `INSERT INTO users(name, password, email,role,zone_access,branch_access,plant_access) VALUES(?, ?, ?, ?, ?, ?, ?)`
                        conn.query(query, [name,key.toString('hex'),email,role,zone_access,branch_access,plant_access],(error, result) => {
                            if(error){
                                res.status(401).send(error)     
                            }else{
                                res.send({
                                    message: "User registered successfully"
                                })
                            }
                            conn.release()
                        })
                    }
                    conn.release()
                }
            })
            
        }
    })
})

const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM users WHERE email=?`
            conn.query(query, [email], (error, result) => {
                
                if(error){
                    res.status(404).send({
                        message: 'User not found'
                    })
                }
                else{
                    const key = crypto.pbkdf2Sync(password,process.env.SALT, 20000,32,'sha256');
                    let user = JSON.parse(JSON.stringify(result[0]))
                    const newUser = {
                        id: user.user_id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        token: generateToken(user.user_id)
                    }
                    if((key.toString('hex') === user.password) && user){
                        res.send(newUser)
                    }
                    else{
                        res.status(401).send({
                            message: 'Password Incorrect'
                        })
                    }
                    conn.release()
                }    
            })
        }
    })
})

export {registerUser, loginUser}