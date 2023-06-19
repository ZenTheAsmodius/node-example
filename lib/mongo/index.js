const mongoose = require('mongoose');
const { MONGO_URI, NODE_ENV } = require('../../config');

const connection = module.exports = mongoose.createConnection(
  MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // create connection

connection.on('connected', () => {
  if (NODE_ENV != 'test') console.log('Mongoose connected to database');
});

connection.on('error', (err) => {
  if (NODE_ENV != 'test') console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  if (NODE_ENV != 'test') console.log('Mongoose default connection disconnected');
});
