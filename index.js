const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
      const reviewCollection = client.db("betterLife").collection("reviews");
      app.get('/services', async(req,res)=>{
        const query = {};
        const cursor = dataCollection.find(query);
        const services = await cursor.limit(3).toArray();
        res.send(services);
      })
      app.get('/totalservices', async(req,res)=>{
        const query = {};
        const cursor = dataCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      })
      app.get('/services/:id', async(req,res)=>{
        const id = req.params.id
        const query = { _id: ObjectId(id) };
        const service = await dataCollection.findOne(query);
        res.send(service);
      })
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