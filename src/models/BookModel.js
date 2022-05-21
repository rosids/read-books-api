const createModel = require('mongoose').model;
const BookSchema = require('../schemas/BookSchema');

const getBooks = async () =>  {
  const bookModel = createModel('books', BookSchema);
  const books = await bookModel.find();
  console.log("model")
  return books;
};

module.exports = getBooks;
