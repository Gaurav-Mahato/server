import express from "express";
import cors from "cors";
import render from "xlsx";
import pool from "./config/db.js";

const app = express();

const file = render.readFile("./TestData.xlsx")

app.use(cors());
app.use(express.json());


app.get("/", (req,res) => {
    const sheets = file.SheetNames;
    const data = [];
    const extract = (obj,...keys) => {
        const newObject = Object.assign({});
        Object.keys(obj).forEach((key) => {
           if(keys.includes(key)){
              newObject[key] = obj[key];
              delete obj[key];
           };
        });
        return newObject;
    }
    for(var i=0;i<sheets.length;i++){
        const sheetName = sheets[i]
        const sheetData = render.utils.sheet_to_json(file.Sheets[sheetName])
        
        sheetData.forEach(a => {
            data.push(a)
        })
        var sendingData = [];
        data.map(dataPiece => sendingData.push(extract(dataPiece,'Billing Date','Payer','Customer','Micro Market','Material Number','Plant','Billed Quantity','Zone','Customer type','Net Value','MOM','PAM')))
        let usingFilter = (arr) => {  
            return arr.filter(function(item,index){  
                  return arr.indexOf(item) == index;  
               });  
            }  
        const zone = usingFilter(sendingData.map(data => data.Zone))
        const arrayMaker = (str) => {
            let arr = []
            Object.keys(sendingData).forEach(key => {
              arr.push(sendingData[key][str])
            })
            return usingFilter(arr)
        }
        const valueMaker = (str) => {
            const s = []
            for(let i=0;i<arrayMaker(str).length;i++){
                let qt = []
                Object.keys(sendingData).forEach(key => {
                    if(sendingData[key][str] === arrayMaker(str)[i]){
                        qt.push(sendingData[key]['Billed Quantity'])
                    }
                })
                const sumEntry = qt.reduce((acc, curr) => acc + curr)
                s.push(sumEntry)
            }
            return s;
        }
        res.send({
            zoneValue: valueMaker('Zone'), 
            materialValue: valueMaker('Material Number'),
            zone: arrayMaker('Zone'), 
            material: arrayMaker('Material Number'),
            date: arrayMaker('Billing Date'),
            dateValue: valueMaker('Billing Date')
        });
    }
})

app.post("/", (req,res) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }
        else{
            const {name, password,email} = req.body
            const query = `INSERT INTO admin(name, password, email) VALUES(?, ?, ?)`
            conn.query(query, [name,password,email],(error, result) => {
                conn.release()
                if(error){
                    console.log(error)
                }
                console.log(result)
            })
        }
    })
    
})

app.listen(8080, (req,res) => {
    console.log("Server running at 8080")
})