import data from './data/dataColumns.json' with { type: "json" };

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

/**
 * Returns the column type of the given column name
 * 
 * @param {string} tableName
 * 
 * @param {string} columnName
 * 
 * @returns {string | string[]} column type (string, number, date, or array)
 */
function columnType(tableName, columnName) {
    return data.columnTypes[tableName][columnName];
}

/**
 * Filters the table. Returns which rows have the exact value in the given column
 * 
 * @param {string} tableName
 * 
 * @param {string} columnName
 * 
 * @param {string} value
 * 
 * @returns {Set} foundTableRows
 */
function filterByExact(tableName, columnName, value) {
    let foundTableRows = new Set();
    
    data.tables[tableName].forEach((itm, idx) => {
        if (itm[columnName] === value)
            foundTableRows.add(idx);
    });

    return foundTableRows;
}

/**
 * Filters the table. Returns which rows have the value in the given column that contains the given value
 * 
 * @param {string} tableName
 * 
 * @param {string} columnName
 * 
 * @param {string} value
 * 
 * @returns {Set} foundTableRows
 */
function filterByContains(tableName, columnName, value) {
    let foundTableRows = new Set();
    
    data.tables[tableName].forEach((itm, idx) => {
        // console.log(i)
        if (itm[columnName].includes(value))
            foundTableRows.add(idx);
    });

    return foundTableRows;
}

/**
 * Filters the table if the value in the given column is type date and is between the given start and end dates
 * 
 * @param {string} tableName
 * 
 * @param {string} columnName   
 * 
 * @param {string} startDate
 * 
 *  @param {string} endDate
 * 
 * @returns {Set} foundTableRows
 */
function filterByRange(tableName, columnName, startDate, endDate) {
    let foundTableRows = new Set();
    
    if (data.columnTypes[columnName] == "date") {
        data.tables[tableName].forEach((itm, idx) => {
            if (itm[columnName] >= startDate && itm[columnName] <= endDate)
                foundTableRows.add(idx);
        });
    }
    return foundTableRows;
}

/**
 * Filters the table based on the given filters
 * 
 * @param {string} tableName
 * 
 * @param {Object[]} filters
 * 
 * @returns {Object[]} foundTableRows
 */
function filterTable(tableName, filters){
    /*
        Example filters array:
        const filters = [
            {
                type: "exact",
                columnName: "status",
                value: "active"
            },
            {
                type: "contains",
                columnName: "name",
                value: "John"
            },
            {
                type: "date",
                columnName: "created_at",
                startDate: "2023-01-01",
                endDate: "2023-12-31"
            }
        ];
    */

    let foundTableRows = new Set();
    let arrayToReturn = [];

    for (i in data.tables[tableName]) {
        foundTableRows.add(i);
    }

    for (let i = 0; i < filters.length; i++) {
        switch (filters[i].type) {
            case "exact":
                foundTableRows = filterByExact(tableName, filters[i].columnName, filters[i].value);
                break;
            case "contains":
                foundTableRows = filterByContains(tableName, filters[i].columnName, filters[i].value);
                console.log(foundTableRows);
                break;
            case "range":
                foundTableRows = filterByRange(tableName, filters[i].columnName, filters[i].startDate, filters[i].endDate);
                break;
            default:
                // Handle unknown filter type
                break;
        }
    }

    for (let row of foundTableRows) {
        arrayToReturn.push(data.tables[tableName][row]);
    }

    return arrayToReturn;
}

/**
 * Returns the visible columns of the table
 * 
 * @param {string} tableName
 * 
 * @param {string[]} visibleColumns
 * 
 * @returns {Object[]} newTable
 */
function applyVisibleColumns (tableName, visibleColumns) {
    let newTable = [];

    data.tables[tableName].forEach((row) => {
        let newRow = {};

        for (let column of visibleColumns) {
            newRow[column] = row[column];
        }

        newTable.push(newRow);
    });

    return newTable;
}

export default {
    filterTable,
    applyVisibleColumns
}