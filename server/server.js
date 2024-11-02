import express from 'express';
import bodyParser from 'body-parser';
import filters from './filters.js';
import data from './data/testData.json' with { type: "json" };

const app = express();

app.use(bodyParser.json());


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

    let tableToReturn = filters.filterTable(req.params.tableName, req.query.filters || [{type: "all"}]);
    
    if (req.query.sort) {
        // sort the table based on the sort parameter
        
        tableToReturn.sort((a, b) => {
            let first = a[req.query.sort];
            let second = b[req.query.sort];

            let returnVal = null;

            if (second === first)
                returnVal = 0;
            returnVal = (((second < first) != (req.query.sortReversed === "true")) ? 1 : -1);
            console.log(returnVal);
            return returnVal;
        });
    }

    res.status(200).send(tableToReturn);
});

//Start express application
app.listen(8080, () => {
    console.log("Server is running on port 8080")
})