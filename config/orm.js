var connection = require("../config/connection.js");

// Create an array for question marks needed for MySQL values:
function printQuestionMarks(num) {
    var arr = [];

    for(var i = 0; i < num; i++) {
        arr.push("?");
    };

    return arr.toString();
};

// Create a function to push object key/value into MySQL syntax:
function objToSql(obj) {
    var arr = [];

    for(var key in obj) {
        var val = obj[key];
        // .hasOwnProperty is a javascript boolean indicating whether the object has the specified property as its own property.
        if(Object.hasOwnProperty.call(obj, key)) {
            // If the string has spaces, put quotations around it:
            if(typeof val === "string" && val.indexOf(" ") >= 0) {
                val = "'" + val + "'";
            }
            arr.push(key + "=" + val);
        };
    };
    return arr.toString();
};

//ORM methods that will be needed: selectAll(), insertOne(), updateOne()
var orm = {
    selectAll: function(tableInput, callBack) {
        var queryStr = "SELECT * FROM " + tableInput + ";";
        connection.query(queryStr, function(err, res) {
            if(err) throw err;
            callBack(res);
        })
    },
    insertOne: function(table, cols, vals, callBack) {
        var queryStr = "INSERT INTO " + table;
        
        queryStr += " (";
        queryStr += cols.toString();
        queryStr += ") ";
        queryStr += "VALUES (";
        queryStr += printQuestionMarks(vals.length);
        queryStr += ") ";

        // Check that queryStr will pull data from the table correctly:
        console.log(queryStr);

        connection.query(queryStr, function(err, res) {
            if(err) throw err;
            callBack(res);
        })
    },
    updateOne: function(table, colVals, cond, callBack) {
        var queryStr = "UPDATE " + table;

        queryStr += "SET ";
        queryStr += objToSql(colVals);
        queryStr += "WHERE ";
        queryStr += cond;

        // Check that queryStr will pull data from the table correctly:
        console.log(queryStr);

        connection.query(queryStr, function(err, res) {
            if(err) throw err;
            callBack(res);
        });
    }
};

module.exports = orm;