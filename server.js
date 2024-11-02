// Load HTTP module
// const http = require("http");
const express = require("express");
const app = express();

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;

var $ = (jQuery = require("jquery")(window));

app.use(express.static("public"));

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: "pillTracker",
});

connection.connect();

app.use(express.json());

// app.post("/api/pills", (req, res) => {
//   const { name, amount } = req.body;

//   const query = "INSERT INTO pills (name, amount) VALUES ('y', 2)";
//   connection.query(query, [name, amount], (error, results) => {
//     if (error) {
//       console.error("Error inserting data:", error);
//       res.status(500).send("Error inserting data");
//     } else {
//       console.log("Data inserted successfully:", results);
//       res.status(200).send("Data inserted successfully");
//     }
//   });
// });

app.get("/api/pills", (req, res) => {
  const query = "select * from pills;";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Error inserting data");
    } else {
      console.log("Data retrieved successfully: ", results);
      res.status(200).send(results);
    }
  });
});

app.post("/submit", (req, res) => {
  const { name, amount } = req.body;
  const sql = "INSERT INTO pills (name, amount) VALUES (?, ?)";
  connection.query(sql, [name, amount], (err, result) => {
    if (err) throw err;
    res.send("Data inserted...");
  });
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
});
