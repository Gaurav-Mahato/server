import pool from "../config/db.js"

const sendData = (req,res) => {
    const {zoneDetails,branchDetails, plantDetails} = req
    res.send({
        zone: zoneDetails,
        branch: branchDetails,
        plant: plantDetails
    })
}

const zoneGetter = (req,res) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM testdata WHERE Zone=?`
            conn.query(query,[req.body.zone_name],(error,result) => {
                if(error){
                    res.status(401).send({
                        message: "Unable to extract data"
                    })
                }
                else{
                    res.send(result)
                }
            })
        }
    })
}

const branchGetter = (req,res) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM testdata WHERE Region=?`
            conn.query(query,[req.body.branch_name],(error,result) => {
                if(error){
                    res.status(401).send({
                        message: "Unable to extract data"
                    })
                }
                else{
                    res.send(result)
                }
            })
        }
    })
}

const plantGetter = (req,res) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM testdata WHERE Plant=?`
            conn.query(query,[req.body.plant_name],(error,result) => {
                if(error){
                    res.status(401).send({
                        message: "Unable to extract data"
                    })
                }
                else{
                    res.send(result)
                }
            })
        }
    })
}

const getZones = (req,res) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM zone`
            conn.query(query, (error, result) => {
                if(error){
                    res.status(404).send({
                        message: "Unable to extract data"
                    })
                }
                else{
                    res.send(result)
                }
            })
        }
    })
}

const getBranches = (req,res) => {
    const zone = req.params.zone
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM branch WHERE Zone=?`
            conn.query(query,[zone] ,(error, result) => {
                if(error){
                    res.status(404).send({
                        message: "Unable to extract data"
                    })
                }
                else{
                    res.send(result)
                }
            })
        }
    })
}

const getAllBranches = (req,res) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM branch`
            conn.query(query, (error, result) => {
                if(error){
                    res.status(404).send({
                        message: "Unable to extract data"
                    })
                }
                else{
                    res.send(result)
                }
            })
        }
    })
}

const getAllPlants = (req,res) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM plant`
            conn.query(query, (error, result) => {
                if(error){
                    res.status(404).send({
                        message: "Unable to extract data"
                    })
                }
                else{
                    res.send(result)
                }
            })
        }
    })
}

const getDummy = (req,res) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err
        }
        else{
            const query = `SELECT * FROM dummy`
            conn.query(query, (error, result) => {
                if(error){
                    res.status(404).send({
                        message: "Data not found"
                    })
                }else{
                    res.send(JSON.parse(JSON.stringify(result)))
                }
            })
        }
    })
}
export {sendData,zoneGetter,branchGetter,plantGetter,getZones,getBranches, getAllBranches, getAllPlants,getDummy}