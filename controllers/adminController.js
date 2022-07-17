import asyncHandler from "express-async-handler"
import pool from "../config/db.js"
import crypto from "crypto"
import generateToken from "../utils/generateToken.js"

const registerAdmin = asyncHandler(async(req,res) => {
    const {name, password,email} = req.body
    const key = crypto.pbkdf2Sync(password,process.env.SALT, 20000,32,'sha256');
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }
        else{
            const query = `INSERT INTO admin(name, password, email) VALUES(?, ?, ?)`
            conn.query(query, [name,key.toString('hex'),email],(error, result) => {
                conn.release()
                if(error){
                    console.log(error)
                }
                console.log(result)
            })
            const get = `SELECT * FROM admin WHERE email=?`
            conn.query(get,[email],(err,result) => {
                conn.release()
                if(err){
                    res.status(400).send(err)
                }else{
                    res.send(JSON.stringify(result[0]))
                }
            })
        }
    })
})

const loginAdmin = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM admin WHERE email=?`
            conn.query(query, [email], (error, result) => {
                conn.release()
                if(error){
                    res.status(404).send({
                        message: 'User not found'
                    })
                }
                else{
                    const key = crypto.pbkdf2Sync(password,process.env.SALT, 20000,32,'sha256');
                    let user = JSON.parse(JSON.stringify(result[0]))
                    user = {
                        ...user,
                        token: generateToken(user.admin_id)
                    }
                    if((key.toString('hex') === user.password) && user){
                        res.send(user)
                    }
                    else{
                        res.status(401).send({
                            message: 'Password Incorrect'
                        })
                    }
                }    
            })
        }
    })
})

const updateZone = (req,res) => {
    const {zone} = req.body
    pool.getConnection((err,conn) => {
        if(err){
            res.status(404).send(err)
        }
        else{
            const query = `INSERT INTO zone(name) VALUES(?)`
            conn.query(query, [zone], (error,result) => {
                conn.release()
                if(error){
                    res.status(404)
                }else{
                    console.log(result)
                    res.send({
                       success: true
                   })
                }
            })
        }
    })
}

const updateBranch = (req,res) => {
    const {branch,zone} = req.body
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }else{
            const query = `INSERT INTO branch(name,zone) VALUES(?,?)`
            conn.query(query, [branch,zone], (error, result) => {
                conn.release()
                if(error){
                    res.status(404).send({
                        message: 'Not able to add branch'
                    })
                }
                else{
                    res.send({
                        success: true
                    })
                }
            })
        }
    })
}

const updatePlant = (req,res) => {
    const {plant, branch} = req.body
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `INSERT INTO plant(name, branch) VALUES(?,?)`
            conn.query(query,[plant,branch],(error,result) => {
                conn.release()
                if(error){
                    res.status(400).send({
                        message: 'Not able to add plant'
                    })
                }
                else{
                    res.send({
                        success: true
                    })
                }
            })
        }
    })
}

export {registerAdmin,updateZone,loginAdmin, updateBranch,updatePlant}