const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRouter = require('./routes/auth');




const Port = process.env.PORT || 2000;  // Port variable 
const app = express();                 // install epress 

app.use(express.json());
app.use(authRouter);


const DB  = process.env.DB;

mongoose.connect(DB).then(()=>{
    console.log('MongoDB is Connected ');
}).catch((e)=>{
    console.log(e);
});

app.listen(Port,()=>{
    console.log(`server is listening on port ${Port}`);
});