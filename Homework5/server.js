const express = require('express')
var mysql = require('mysql');

const app = express()

var con = mysql.createConnection({
  host: "localhost",
  user: "colizu",
  password: "issaquah",
  database: "homework_5"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("Select * from user", (error, result, fields) => {
    if (error) throw error
    console.log(result);
  })

});

app.listen(3000)