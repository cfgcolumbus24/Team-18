import express from 'express';
import bodyParser from 'body-parser';
import filters from './filters.js';
import data from './data/dataColumns.json' with { type: "json" };
import cors from 'cors';

import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

//Create database connection
const db = new sqlite.Database("./patients.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
})

const sql = `select * from patients`

const patientData = []

//Some boilerplate from https://www.youtube.com/watch?v=ZRYn6tgnEgM&ab_channel=ByteMyke

//Function to query the SQLite database and retrieve all of the existing patient records
async function querySQL() {
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) return console.error(err.message);
            rows.forEach(row => {
                patientData.push(row); 
            })
            resolve()
        })
    })
}

//Function to format JSON data
async function formatData() {
    await querySQL();
    data.tables = {
        "patients": patientData
    }
}

formatData()

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("nothing to see here....")
})

app.get("/table-types/:tableName", (req, res) => {
    if (!data.columnTypes[req.params.tableName]) {
        res.status(404).send("Table not found");
        return;
    }
    
    res.status(200).send(data.columnTypes[req.params.tableName]);
});

app.get("/tables/", (req, res) => {
    res.status(200).send(Object.keys(data.tables));
});

app.get("/tables/:tableName/", (req, res) => {
    if (!data.tables[req.params.tableName]) {
        res.status(404).send("Table not found");
        return;
    }

    let tableToReturn = {};
    
    if (req.query.filters)
        filters.filterTable(req.params.tableName, JSON.parse(req.query.filters));
    else {
        tableToReturn = data.tables[req.params.tableName];
    }

    if (req.query.visibleColumns)
        tableToReturn = filters.applyVisibleColumns(req.params.tableName, JSON.parse(req.query.visibleColumns) );
    
    if (req.query.sort) {
        // sort the table based on the sort parameter
        
        tableToReturn.sort((a, b) => {
            let first = a[req.query.sort];
            let second = b[req.query.sort];

            let returnVal = null;

            if (second === first)
                returnVal = 0;
            returnVal = (((second < first) != (req.query.sortReversed === "true")) ? 1 : -1);
            return returnVal;
        });
    }

    res.status(200).send(tableToReturn);
});

//Start express application
app.listen(8080, () => {
    console.log("Server is running on port 8080")
})