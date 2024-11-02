const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sqlite = require("sqlite3").verbose()

//Boilerplate sqlite code gotten from: https://www.youtube.com/watch?app=desktop&v=mnH_1YGR2PM&ab_channel=ByteMyke

//Create database connection
const db = new sqlite.Database("./patientRecords.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
})

app.use(bodyParser.json())

//Post Request

app.post("/", (req, res) => {
    try {
        const {patientId, name, dob, intakeDate, dischargeDate, dischargeType, gender, sexualOrientation, race, clinicianNotes} = req.body;
        sql = `INSERT INTO patientRecords(patientId, name, dob, intakeDate, dischargeDate, dischargeType, gender, sexualOrientation, race, clinicianNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        db.run(sql,[patientId, name, dob, intakeDate, dischargeDate, dischargeType, gender, sexualOrientation, race, clinicianNotes], (err) => {
            if (err) {
                return res.json({
                    status: 303,
                    success: false,
                })
            }
            console.log("success!")
        })
        console.log(req.body.name);
        return(res.json({
            status: 200,
            success: true
        }));
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
})

//Get all path
app.get("/", (req, res) => {
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
    console.log("Server is running on port 8080")
})