const express = require('express')

const app = express()
const sqlite = require("sqlite3").verbose()
const db = database 

//TODO: Connect to database

//Boilerplate sql tutorial: https://www.youtube.com/watch?app=desktop&v=mnH_1YGR2PM&ab_channel=ByteMyke

//Get all path
app.get("/patientRecords", (req, res) => {
    sql = "SELECT * from patientRecords"
    try {
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.json({
                    status: 300,
                    success: false,
                    error: err
                })
            }
            //TODO: Maybe more error handling? 
            return res.json({status: 200, data: rows, success: true})
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false
        })
    }
})

//Get some based on query parameters

//Start express application
app.listen(8080, () => {
    console.log("Server is running")
})