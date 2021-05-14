const express = require("express");
const { connect } = require("./db");
require("dotenv").config();
const app = express();
const port = 3001;
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// Connection URL
const url =
  "mongodb+srv://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PASS +
  "@cluster0.tslfw.mongodb.net";

connect(url).then((db) => {
  app.get("/tickets", async (req, res) => {
    const collection = db.db("theatre-ticketing");
    const ticketCollection = collection.collection("tickets");
    const tickets = await ticketCollection.find().toArray();
    //console.log({ tickets });
    res.send(tickets);
  });

  app.get("/profits", async(req, res) => {
    const collection = db.db("theatre-ticketing");
    const ticketCollection = collection.collection("tickets");
    const tickets = await ticketCollection.find().toArray();
    //const profits = 0;
    var dateToStr = date1.toUTCString().split(' ');
    var month1 = dateToStr[2];
    var dateToStr = date2.toUTCString().split(' ');
    var month2 = dateToStr[2];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const amount = [0,0,0,0,0,0,0,0,0,0,0,0];
    var profits = [];

    for (var i=0; i < tickets.length; i++) {
      if (tickets[i].performanceTime >= date1 && tickets[i].performanceTime <= date2) {
        var d = new Date(tickets[i].performanceTime);
        var profitMonth = monthNames[d.getMonth()];
        var proftAmount = tickets[i].ticketPrice;
        amount[d.getMonth()] = amount[d.getMonth()] + profitAmount;
        
        
        // var dateToStr = tickets[i].performanceTime.toUTCString().split(' ');
        // var profitMonth = dateToStr[2];
        // if ($.inArray('profitMonth', arr))
        // for (int j=0, j<profits.length)
        // profits += tickets[i][5];
      }
    }  
    
    for (var i=0; i<amount.length; i++) {
      if (amount[i] != 0) {
        profits.push(monthNames[i] + " : " + amount[i]);
      }
    }
    res.send(profits);
  });



  app.get("/", function (req, res) {
    res.send("abcd");
  });

  app.post("/ticket", function (req, res) {
    const newData = req.body;
    // const collection = db.db("theatre-ticketing");
    // const ticketCollection = collection.collection("tickets");
    // ticketCollection.insertOne(newData);
    console.log(newData);
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
