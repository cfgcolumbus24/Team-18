//Credit for boilerplate sql code: https://www.youtube.com/watch?app=desktop&v=mnH_1YGR2PM&ab_channel=ByteMyke

import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

//Create database connection
const db = new sqlite.Database("./patients.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
})

//SQL query to create patients table
const sql = `CREATE TABLE patients(ID INTEGER PRIMARY KEY, patientId, name, dob, intakeDate, dischargeDate, dischargeType, gender, sexualOrientation, race, clinicianNotes)`;

//Used OpenAI to get default values -> SQL query to insert hard-coded values
// const sql = `INSERT INTO patients(patientId, name, dob, intakeDate, dischargeDate, dischargeType, gender, sexualOrientation, race, clinicianNotes) VALUES
// (100001, 'John Doe', '1985-06-15 00:00:00', '2023-05-20 14:30:00', '2023-06-15 09:00:00', 'Full Recovery', 'Male', 'Heterosexual', 'Caucasian', 'Patient responded well to treatment. Recommend follow-up in 3 months.'),
// (100002, 'Jane Smith', '1992-11-03 00:00:00', '2023-04-10 10:15:00', '2023-05-05 11:00:00', 'Partial Recovery', 'Female', 'Bisexual', 'African American', 'Patient showed improvement but needs additional physical therapy.'),
// (100003, 'Alex Brown', '1978-02-25 00:00:00', '2023-03-01 13:45:00', '2023-04-01 15:30:00', 'Transferred', 'Non-binary', 'Asexual', 'Asian', 'Patient transferred to specialized care facility for further assessment.'),
// (100004, 'Maria Garcia', '2001-07-18 00:00:00', '2023-02-15 09:30:00', '2023-03-10 10:00:00', 'Discharged Against Medical Advice', 'Female', 'Heterosexual', 'Hispanic', 'Patient discharged against medical advice after improvement.'),
// (100005, 'Samuel Lee', '1969-04-22 00:00:00', '2023-06-01 08:00:00', '2023-07-01 14:00:00', 'Full Recovery', 'Male', 'Heterosexual', 'Asian', 'Patient recovered well and shows no residual symptoms.'),
// (100006, 'Emma Thompson', '1988-12-30 00:00:00', '2023-05-15 09:00:00', '2023-06-10 12:30:00', 'Partial Recovery', 'Female', 'Lesbian', 'Caucasian', 'Patient needs continued outpatient therapy for sustained improvement.'),
// (100007, 'Carlos Martinez', '1974-03-10 00:00:00', '2023-07-20 11:15:00', '2023-08-15 10:45:00', 'Full Recovery', 'Male', 'Heterosexual', 'Hispanic', 'Patient has fully recovered and was discharged with no complications.'),
// (100008, 'Sophia Kim', '1995-09-05 00:00:00', '2023-03-10 08:30:00', '2023-04-05 13:00:00', 'Transferred', 'Female', 'Heterosexual', 'Asian', 'Patient transferred to a specialized unit for continued care.');
// `
db.run(sql)