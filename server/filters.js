import data from "./data/testData.json" with { type: "json" };

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
    
    for (i in data.tables[tableName]) {
        if (i[columnName] === value)
            foundTableRows.add(i);
    }

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
    
    for (i in data.tables[tableName]) {
        if (i[columnName].includes(value))
            foundTableRows.add(i);
    }

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
function filterByDate(tableName, columnName, startDate, endDate) {
    let foundTableRows = new Set();
    
    if (data.columnTypes[columnName] == "date") {
        for (i in data.tables[tableName]) {
            if (i[columnName] >= startDate && i[columnName] <= endDate)
                foundTableRows.add(i);
        }
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

    for (let i = 0; i < filters.length; i++) {
        for (let i = 0; i < filters.length; i++) {
            switch (filters[i].type) {
                case "all":
                    for (i in data.tables[tableName]) {
                        foundTableRows.add(i);
                    }
                    break;
                case "exact":
                    foundTableRows = filterByExact(tableName, filters[i].columnName, filters[i].value);
                    break;
                case "contains":
                    foundTableRows = filterByContains(tableName, filters[i].columnName, filters[i].value);
                    break;
                case "date":
                    foundTableRows = filterByDate(tableName, filters[i].columnName, filters[i].startDate, filters[i].endDate);
                    break;
                default:
                    // Handle unknown filter type
                    break;
            }
        }
    }

    for (let row of foundTableRows) {
        arrayToReturn.push(data.tables[tableName][row]);
    }

    return arrayToReturn;
}

export default {
    filterTable
}