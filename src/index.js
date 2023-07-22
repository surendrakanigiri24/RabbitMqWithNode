require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON data in request body
app.use(express.json());


// sample route
app.get("/", (req,res) => {
  res.status(200).send({message:" YA!, I am working. "});
})

// RabbitMQ functions 
const rabbitSend = require('./controller/Basic Implementation/send');
rabbitSend;

const rabbitReceive = require('./controller/Basic Implementation/receiver');
rabbitReceive;

// TO handle requests
const server = app.listen( PORT, () => {
  console.log('Server listening on port 3000');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`${PORT} is already in use`);
    } else {
      console.error(err);
    }
});


module.exports = app; // for testing
