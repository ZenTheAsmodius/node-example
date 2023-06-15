const mongoose = require('mongoose');
const { MONGO_URI } = require('../../config');

let connection = module.exports = mongoose.createConnection(
  MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }); // create connection

connection.on('connected', () => {
  console.log('Mongoose connected to database');
});

connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
