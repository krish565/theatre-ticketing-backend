const express = require("express");
const { connect } = require("./db");
require("dotenv").config();
const app = express();
const port = 3000;

// Connection URL
const url =
  "mongodb+srv://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PASS +
  "@cluster0.tslfw.mongodb.net";

connect(url).then((db) => {
  app.get("/", async (req, res) => {
    const collection = db.db("theatre-ticketing");
    const ticketCollection = collection.collection("tickets");
    const tickets = await ticketCollection.find().toArray();
    console.log({ tickets });
    res.send(tickets);
  });

  app.post("/", function (req, res) {
    res.send("Got a POST request");
  });

  app.put("/user", function (req, res) {
    res.send("Got a PUT request at /user");
  });

  app.delete("/user", function (req, res) {
    res.send("Got a DELETE request at /user");
  });

  app.listen(port, () => {
    console.log(`Theatre Ticketing app listening at http://localhost:${port}`);
  });
});
