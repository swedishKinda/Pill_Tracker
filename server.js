// Load HTTP module
// const http = require("http");
const express = require("express");
const app = express();

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

// const hostname = "127.0.0.1";
// const port = 8000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Node.js Button Example</title>
    </head>
    <body>
      <button id="myButton1">Display Meds</button>
      <script>
        const button = document.getElementById('myButton1');
        button.addEventListener('click', () => {
          fetch('/click')
            .then(response => response.text())
            .then(data => console.log(data));
        });
      </script>
      <table id="tableData" class="table table-fixed">
<thead>
  <tr>
  </tr>
</thead>
<tbody class="tbody" >
</tbody>
    </body>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    </html>
  `);
});

app.get("/click", (req, res) => {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "select * from pills";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
  console.log("Button clicked!");
  res.send("Button click received on the server!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

$(document).ready(() => {
  $.ajax({
    url: "http://localhost:3000/list",
    method: "GET",
    success: function (response) {
      if (response.rows.length > 0) {
        for (let index = 0; index < response.rows.length; index++) {
          var newRow = $("<tr>");
          var cols = "";
          var name = "";
          var amount = "";
          cols += "<td> " + response.rows[index].name + "</td>";
          cols += "<td> " + response.rows[index].amount + "</td>";
          newRow.append(cols);
          $("#tableData .tbody").append(newRow);
        }
      }
    },
  });
});

// // Create HTTP server
// const server = http.createServer(function (req, res) {
//   // Set the response HTTP header with HTTP status and Content type
//   res.writeHead(200, { "Content-Type": "text/plain" });

//   // Send the response body "Hello World"
//   res.end("Hello World\n");
// });

// // Prints a log once the server starts listening
// server.listen(port, hostname, function () {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: "pillTracker",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
});
