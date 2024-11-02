//Boilerplate sql tutorial: https://www.youtube.com/watch?app=desktop&v=mnH_1YGR2PM&ab_channel=ByteMyke

const sqlite = require("sqlite3").verbose()

//Create database connection
const db = new sqlite.Database("./patientRecords.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
})

const sql = `CREATE TABLE patientRecords(ID INTEGER PRIMARY KEY, patientId, name, dob, intakeDate, dischargeDate, dischargeType, gender, sexualOrientation, race, clinicianNotes)`;
db.run(sql);

const insert = `INSERT `