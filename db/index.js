const MongoClient = require("mongodb").MongoClient;
const { randomDocuments } = require("./randomDocuments");

async function connect(url) {
  let db;

  try {
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await client.connect();
    console.log("Connected successfully!");
    const collection = db.db("theatre-ticketing");
    const ticketCollection = collection.collection("tickets");
    // ticketCollection.insertMany(randomDocuments());
    // console.log(randomDocuments()[0]);
  } catch (err) {
    // Handle error
    console.log(err);
  }

  return db;
}

module.exports = {
  connect,
};
