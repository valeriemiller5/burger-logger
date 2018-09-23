var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burgers_db"
  });

  connection.connect(function(err) {
    if (err) {
      console.error("Error Message: " + err.stack);
      return;
    }
    console.log("Connection ID: " + connection.threadId);
  });
  
  module.exports = connection;