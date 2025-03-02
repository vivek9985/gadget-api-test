const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.iz5qc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

// const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("myDB").collection("movies");
    app.post("/movie", async (req, res) => {
      try {
        const data = req.body;
        const result = await database.insertOne(data);
        console.log(result);
        res.send(result);
      } catch (err) {
        res.send(err.message);
      }
    });
    app.get("/movie", async (req, res) => {
      try {
        const result = await database.find().toArray();
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
