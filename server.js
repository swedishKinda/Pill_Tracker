// index.js
const express = require("express");
const { Pool } = require("pg");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set up the PostgreSQL connection pool
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://udaendc20npfup:pe119b7c2a6aba549de38a2d3d07bc7c9340ed7f94166ff0316512b194883a611@c3cj4hehegopde.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/df3d3ojlucpms8", // Add Heroku's DATABASE_URL here
  ssl: { rejectUnauthorized: false }, // For Heroku SSL
});

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Define a route to get data from a table
app.get("/", async (req, res) => {
  try {
    // Query the database for all rows in the specified table
    const result = await pool.query("SELECT * FROM pills"); // Replace with your actual table name
    const rows = result.rows;

    // Render the data in an HTML table using EJS
    res.render("index", { rows }); // Pass the fetched rows to the EJS template
  } catch (error) {
    console.error("Error querying the database", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const { name, amount, doses_per_day } = req.body;

  try {
    // Insert the new row into the table
    const result = await pool.query(
      "INSERT INTO pills (name, amount, doses_per_day, last_updated) VALUES ($1, $2, $3, NOW())",
      [name, amount, doses_per_day]
    );

    // console.log("New row added:", result.rows[0]);

    // Redirect back to the table view after inserting the row
    res.redirect('/');
  } catch (error) {
    console.error("Error inserting data into the database", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", async (req, res) => {
  const { name } = req.body;

  try {
    // Insert the new row into the table
    const result = await pool.query("delete from pills where name = $1", [
      name,
    ]);

    // console.log("Row deleted:", result.rows[0]);

    // Redirect back to the table view after inserting the row
    res.redirect('/');
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/clear-all", async (req, res) => {
  try {
    // Perform the DELETE query to clear all rows from the people table
    const result = await pool.query("DELETE FROM pills");

    // res.render('result', { message: 'All records have been deleted.', success: true });
    res.redirect('/');
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
