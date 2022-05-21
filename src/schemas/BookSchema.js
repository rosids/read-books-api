const Schema = require('mongoose').Schema;

const bookSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String}
});

module.exports = bookSchema;