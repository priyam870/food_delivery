const express = require('express');
const app = express();
const connection = require('./connection/connect')
const config = require('config');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/api',require('./v1/routes/index'));
app.use(express.json);
connection.connect();

app.use((error, req, res, _) => {
    console.log("ERROR : ------------------>", error);
    return res.status(error.status ? error.status : 400).json({
      error: true,
      message: error.message ? error.message : error,
      data: {},
    });
  });

app.listen(config.get('PORT'),()=>{
    console.log(`server up and running on ${config.get('PORT')}`);
})