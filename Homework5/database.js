var mysql = require('mysql');

module.exports = mysql.createConnection({
  host: "localhost",
  user: "colizu",
  password: "issaquah",
  database: "homework_5",
  multipleStatements: true
});