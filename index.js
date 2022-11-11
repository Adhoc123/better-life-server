const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
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

      ////posting jwt token
      app.post('/jwt', async(req, res)=>{
         const user = req.body;
         const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1h'})
         res.send({token});
      })
      ///receiving services
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

      ////Here goes review api
      app.post('/reviews', async(req, res) =>{
         const review = req.body;
         const result = await reviewCollection.insertOne(review);
         res.send(result);
      })
      app.post('/addService', async(req, res) =>{
        const service = req.body;
        const result = await dataCollection.insertOne(service);
        res.send(result);
     })

      ///Reading reviews from database
      app.get('/reviews', async(req, res) =>{
        let query = {};
        if(req.query.email){
          query = {
            email: req.query.email
          }
        }
        if(req.query.serviceId){
          query = {
            serviceId: req.query.serviceId
          }
        }
        const cursor = reviewCollection.find(query);
        const reviews = await cursor.toArray();
        res.send(reviews);
      })
      ////Edit api created
      app.patch('/reviews/:id', async(req, res) =>{
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
      })
      ///Delete api creating
      app.delete('/reviews/:id', async(req, res) =>{
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await reviewCollection.deleteOne(query);
        res.send(result);
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