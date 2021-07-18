const express = require('express');
const app = express();
const connection = require('./connection/connect')
const config = require('config');
const bodyParser = require('body-parser');

app.use(express.json);
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api', require('./v1/routes/index'));

connection.connect();//connecting MongoDB

// For any errors in catch block of controllers
app.use((error, req, res, _) => {
  console.log("ERROR : ------------------>", error);
  return res.status(error.statedus ? error.status : 400).json({
    error: true,
    message: error.message ? error.message : error,
    data: {},
  });
});

//server listening at PORT 8000 as mentioned in the default.json file in config folder
module.exports.server = app.listen(config.get('PORT'), () => {
  console.log(`server up and running on ${config.get('PORT')}`);
})