const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const port = 3000

//useing middleware
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded());


//connecting to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017",{
  dbName:"contact"
}).then(()=>{console.log("database connectd successfully")})
  .catch(()=>{console.log("ERROR: Couldn't connect")})


const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
    message:String,
})

const Messge = mongoose.model("message", messageSchema)



//setting view engine to ejs
app.set('view engine', "ejs");

//all get requests
app.get("/",(req,res)=>{
    res.render("index")
})

//all post requests
app.post("/",async(req,res)=>{
    //const name = req.body.name;
    //const email = req.body.email;
    //const message = req.body.message;
    const {name,email,message} = req.body
    console.log(name, email, message);

    await Messge.create({name,email,message});

    res.send("success!!")
})


app.listen(port,()=>{
    console.log(`App is listening on ${port}`);
})