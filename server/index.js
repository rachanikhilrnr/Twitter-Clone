const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userModel = require('./models/users')

const app = express()
app.use(cors({
    origin: ["https://twitter-clone-liard-sigma.vercel.app/"],
    methods:["POST","GET"],
    credentials:true
    }
));
app.use(express.json());

mongoose.connect(
    "mongodb+srv://21955a1206:nikhil1528@project.cyg4qu7.mongodb.net/Data?retryWrites=true&w=majority&appName=Project"
)

app.listen(5000,() => {
    console.log("Server is running in port no 5000");
})

app.get('/getUsers', (req,res) => {
    userModel.find({}).then(function(x){
        res.json(x);
    }).catch(function(x){
        res.json(err);
    })
})

app.get('/getUsers/:id',async (req,res) => {
    const data = req.params.id;
    const user = await userModel.findById(data);
    if(!user){
        return res.json({"Message":"User not found"});
    }
    res.json(user);
})

app.delete('/getUsers/:id', async (req,res) => {
    const id = req.params.id;
    const deleteUser = await userModel.findByIdAndDelete(id);
    if(!deleteUser){
        return res.json({"Message":"User not found"});
    }
    res.json({"Message":"User Deleted"});
})

app.patch('/getUsers/:id',async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    const updateUser = await userModel.findByIdAndUpdate(id,data);
    if(!updateUser){
        res.json({"Message":"User not found"});
    }
    res.json({"Message":"User Updated Successfully"});
})

app.post('/getUsers', async (req,res) => {
    const user = req.body;
    const newUser = new userModel(user);
    await newUser.save();
    res.json({"Username":newUser._id});
})

app.get('/',(req,res) => {
    res.send("You are at the root");
})
