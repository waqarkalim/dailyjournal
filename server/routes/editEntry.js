var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var Sentiment = require("sentiment");

router.post("/", function (req, res, next) {
  modifyEntries(req, () => {
    fetchEntries((entries) => {
      res.send(entries); // we have to do 2 mysql queries because the entry_id is auto-generated by mysql -> cannot handle here!
    });
  });
});

var modifyEntries = (req, callback) => {
  try {
    var con = mysql.createConnection({
      host: "localhost",
      user: "webservice",
      password: "fintech",
    });
  } catch (err) {
    return null;
  }

  con.connect((err) => {
    if (err) return null;
    var sentiment = analyzeSentiment(req.body.formBody);
    var sql =
      "UPDATE wh7.entries SET title='" +
      req.body.title +
      "', date='" +
      req.body.date +
      "', body='" +
      req.body.formBody +
      "', user_id=" +
      req.body.user_id +
      ", score=" +
      sentiment.score +
      ", comparative=" +
      sentiment.comparative +
      " WHERE entry_id=" +
      req.body.entry_id;

    console.log(sql);
    // var sql = "INSERT INTO wh7.entries(title, date, body, user_id, score, comparative) VALUES ('" + req.body.formTitle + "', '" + req.body.date + "', '" + req.body.formBody + "',"  + req.body.userId + "," + sentiment.score + ", " + sentiment.comparative + ")"; // execute MySQL query string

    con.query(sql, (err, result) => {
      if (err) return null;
      callback();
    });
  });
};

var fetchEntries = (callback) => {
  try {
    var con = mysql.createConnection({
      host: "localhost",
      user: "webservice",
      password: "fintech",
    });
  } catch (err) {
    return null;
  }

  con.connect((err) => {
    if (err) return null;
    var sql = "SELECT * FROM wh7.entries"; // execute MySQL query string

    con.query(sql, (err, result) => {
      if (err) return null;
      callback(result);
    });
  });
};

var analyzeSentiment = (words) => {
  var sentiment = new Sentiment();
  result = sentiment.analyze(words);
  return { score: result.score, comparative: result.comparative };
};

module.exports = router;
