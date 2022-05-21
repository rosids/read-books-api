const mongoose = require('mongoose')

const connection = (mongoDatabaseURI = 'mongodb://172.17.0.2:27017/read_books') =>
  mongoose.connect(mongoDatabaseURI);

module.exports = connection;
