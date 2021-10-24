const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 5000;

// middleWare---
app.use(cors());
app.use(express.json());

// findone or delelte
const ObjectId=require('mongodb').ObjectId ;

// -----database conect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e4xul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db('carmecharnique');
    const servicesCollection = database.collection('services');

    // get api---------
    app.get('/services', async(req,res)=>{
        const services= await servicesCollection.find({}).toArray()
        res.send(services)
    })
    //==========

// get signle service--------
app.get('/services/:id',async(req,res)=>{
    const id=req.params.id
    const query={_id:ObjectId(id)}
    const serivce = await servicesCollection.findOne(query)
    res.send(serivce)
     console.log(serivce);
})

// delete single service
app.delete('/service/:id',async(req,res)=>{
    const id=req.params.id
    const query={_id:ObjectId(id)}
    const result =await servicesCollection.deleteOne(query)
    res.send(result)
})


// =======
    // post api
    app.post('/services', async (req, res) => {
        const service=req.body
   const result = await servicesCollection.insertOne(service);
      res.json(result)
     
    });
// ---------------


  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('running geniou server');
});

app.listen(port, () => {
  console.log('Runing Genious server on port', port);
});
