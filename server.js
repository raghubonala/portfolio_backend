const express = require('express')
const cors = require("cors");
const User = require("./model/User")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://raghubonala1:raghubonala1@cluster0.dvowyb5.mongodb.net/")

app.get("/",(req,res)=>{
    res.json({message:"Api is Loading...."})
})

app.post("/submit",async(req,res)=>{
   try {
    const {name,email,number,message} = req.body
   User.create({name,email,number,message})
   res.json({message:"Data Added"})
   } catch (error) {
    res.json({message:"error"})
   }
})

app.listen(3009,()=>{
    console.log("my server start");
})