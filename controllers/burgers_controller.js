var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

//Create code to route information from the burger.js file
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var object = {
            burgers: data
        };
        console.log(object);
        res.render("index", object);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne(
        [
            "burger_name", "devoured"
        ],
        [
            req.body.burger_name, req.body.devoured
        ],
        function(result) {
            res.json({ id: result.insertId });
        }
    );
});

router.put("/api/burgers/:id", function(req, res) {
    var cond = "id " + req.params.id;
    console.log("Condition: " + cond);

    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        cond,
        function(result) {
            if(result.changedRows == 0) {
                // If there are no changes, status 404, else status 200:
                return res.status(404).end();
            } else {
                rest.status(200).end();
            }
        }
    );
});

module.exports = router;