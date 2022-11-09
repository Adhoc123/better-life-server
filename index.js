const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jutqjot.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const dataCollection = client.db("betterLife").collection("services");
      
    }
    finally {
    
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Server is running')
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})