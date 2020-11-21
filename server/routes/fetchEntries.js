var express = require('express');
var router = express.Router();
var mysql = require("mysql");

router.get('/', function(req, res, next) {
  fetchEntries(result => {
      res.send(result);
  })
});

var fetchEntries = callback => {
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
        var sql = "SELECT * FROM wh7.entries"; // execute MySQL query string

        con.query(sql, (err, result) => {
            if (err) return null;
            callback(result);
        })        
    })
}

module.exports = router;
