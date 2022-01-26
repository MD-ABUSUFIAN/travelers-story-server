const express=require("express");
const cors=require("cors");
require('dotenv').config()
const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0epdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)


//MongoDb Config File 

async function run() {
    try {
      await client.connect();
      const database = client.db("travelStory");
      const blogsCollection = database.collection("blogs");


      app.post('/newBlog',async(req,res)=>{
          const data=req.body;
          const result=await blogsCollection.insertOne(data);
          res.json(result);
          console.log(result)
      })













      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send("WelCome End Game Project")
});

app.listen(port,()=>{
    console.log("Running End Game Server",port)

})