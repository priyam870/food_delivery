const express = require('express');
const app = express();
const connection = require('./connection/connect')
const dotenv = require('dotenv').config({path:__dirname+'/.env'});

app.use('/api',require('./v1/routes/index'));
app.use(express.json);
connection.connect();

app.listen(process.env.PORT,()=>{
    console.log(`server up and running on ${process.env.PORT}`);
})