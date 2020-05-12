//Postgres Database connection
const { Client } = require('pg');

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

/*
Postgres Database Connection
 */
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});

app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.render("index");
})

app.listen(port, function () {
    console.log("app running")
})
