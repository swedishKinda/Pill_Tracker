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

port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   port: 3306,
//   user: "root",
//   password: "password",
//   database: "pillTracker",
// });

// connection.connect();

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

app.post("/submit1", (req, res) => {
  const { name, amount } = req.body;
  const sql = "INSERT INTO pills (name, amount) VALUES (?, ?)";
  connection.query(sql, [name, amount], (err, result) => {
    if (err) throw err;
    res.send("Data inserted...");
  });
});

app.delete("/submit2", (req, res) => {
  const { name } = req.body;
  const sql = "delete from pills where name=?";

  connection.query(sql, name, (err, res) => {
    // if (err) throw err;
    // res.send("Data deleted...");
  });
});

// app.delete('/api/pills', (req, res) => {
//   const id = req.params.id; // Extract the id from the URL

//   // Assuming you're using a database library like Sequelize or raw SQL
//   const query = 'DELETE FROM pills'; // Use your actual table name

//   connection.query(query, [id], (error, results) => {
//       if (error) {
//           return res.status(500).send('Error deleting items');
//       }
//       res.status(200).send('Items deleted successfully');
//   });
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to database:", err);
//     return;
//   }
//   console.log("Connected to database!");
// });
