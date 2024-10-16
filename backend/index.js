const express=require("express");
const mongoose= require("mongoose");
const app=express();
const dotenv = require("dotenv");
const router = require("./routes/router");

dotenv.config();
var cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(router);

mongoose.connect(process.env.Database).then(()=>{
    console.log("Database Connected Succssfully")
}).catch((err)=>{
    console.log(err)
});

app.listen(5000);