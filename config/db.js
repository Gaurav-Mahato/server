import mysql from "mysql2"
import dotenv from "dotenv";
dotenv.config()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'ExceedAcno@12',
    database: 'rmc'
})

export default pool