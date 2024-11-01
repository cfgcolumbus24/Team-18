//Boilerplate sql tutorial: https://www.youtube.com/watch?app=desktop&v=mnH_1YGR2PM&ab_channel=ByteMyke

const sqlite = require("sqlite3").verbose()

//TODO: Make database connection

const sql = `CREATE TABLE patientRecords(ID INTEGER PRIMARY KEY, name, ssn)`