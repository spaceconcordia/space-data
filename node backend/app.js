var express = require('express');
var app = express();
var mysql = require ('mysql')

var DB_HOST = "localhost";
var DB_USER = "testUser";
var DB_PASSWORD = "testPassword";
var DB_NAME = "testDB";

function connectToDB (host, user, password, db) {
  var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: db
  });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return false;
    }
    console.log('Connection established');
  });

  return con;
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/commandWindow', function (req, res) {
  res.send('Some other stuff');
  var con = connectToDB(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
  if (con == false) {
    //exit
  }
  else {
    con.query('SELECT * FROM employees',function(err,rows){
      if(err) throw err;

      console.log('Data received from Db:\n');
      console.log(rows);
    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
