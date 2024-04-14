const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const userModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb+srv://21955a1206:nikhil1528@project.cyg4qu7.mongodb.net/Twitter?retryWrites=true&w=majority&appName=Project"
);

app.get('/', (req,res) => {
    res.json("HELLOWORLD");
})

app.get('/users', (req,res) => {
    userModel.find({}).then(function(users){
        res.json(users);
    }).catch(function(err){
        res.json(err);
    })
})

app.post('/users', async (req,res) => {
    const profile = req.body;
    const newUser = new userModel(profile);
    await newUser.save();
    res.json(newUser);
})

app.listen(5000,() => {
    console.log("Server is running in port number 5000");
})