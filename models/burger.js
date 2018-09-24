var orm = require("../config/orm.js");

//Create code that will call the ORM functions using burger specifi input for the ORM
var burgers = {
    selectAll: function(callBack) {
        orm.selectAll("burgers", function(res) {
            callBack(res);
        });
    },
    insertOne: function(cols, vals, callBack) {
        orm.insertOne("burgers", cols, vals, function(res) {
            callBack(res);
        });
    },
    updateOne: function(colVals, cond, callBack) {
        orm.updateOne("burgers", colVals, cond, function(res) {
            callBack(res);
        });
    }
};

module.exports = burgers;