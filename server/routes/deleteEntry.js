var express = require('express');
var router = express.Router();
var mysql = require("mysql");

router.post('/', function(req, res, next) {
  deleteEntry(req, () => {
      res.send("it is done.... :(");
  })
});

var deleteEntry = (req, callback) => {
    try {
        var con = mysql.createConnection({
            host: "localhost",
            user: "webservice",
            password: "fintech"
        });
    } catch (err) {
        return null;
    }

    con.connect(err => {
        if (err) return null;
        var sql = "DELETE FROM wh7.entries where entry_id=" + req.body.entry_id; // execute MySQL query string

        con.query(sql, (err, result) => {
            if (err) return null;
            callback();
        })        
    })
}

module.exports = router;
