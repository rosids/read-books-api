const mongoose = require('mongoose');

mongoose.Promise = global.Promise

const config = {
  uri: 'mongodb://localhost:27017/read_books',
  options: {
    serverSelectionTimeoutMS: 1000, // conexão com próprio mongo
    connectTimeoutMS: 1000, // conexão na pool
  },
}

mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.');
});

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.');
});

module.exports = {
  connect: () => mongoose.connect(config.uri, config.options)
}
