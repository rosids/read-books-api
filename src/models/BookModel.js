const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String},
});

const getBooks = async () =>  {
  const bookModel = await model('books', bookSchema, 'books');
  const books = await bookModel.find().lean(); // lean = boa prática de performance, para retornar um JSON text-plain ao invés de objetos Mongoose complexos
  return books;
};

module.exports = getBooks;
