const express=require("express");
const cors=require("cors");
require('dotenv').config()
const app=express();
const ObjectId=require("mongodb").ObjectId;
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

//Admin and Traveler POST Method
      app.post('/newBlog',async(req,res)=>{
          const data=req.body;
          const result=await blogsCollection.insertOne(data);
          res.json(result);
          console.log(result)
      })

//All Blogs and Traveler get Method
      app.get('/allBlogs',async(req,res)=>{  
          const result=await blogsCollection.find({}).toArray()
          res.json(result);
          console.log(result)
      })
//Status Base Blogs display get Method
        app.get('/blogs',async(req,res)=>{
        const status = req.query.status;
        const query = {status:status};
        const result=await blogsCollection.find(query).toArray()
        res.json(result)
       
    })

    //Admin Dashboard Blogs Manage Page Delete Method

    app.delete('/manageBlogs/:id',async(req,res)=>{
      const id=req.params.id;
      console.log(id)
      const query={_id:ObjectId(id)}
      const result=await blogsCollection.deleteOne(query);
      res.json(result)
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