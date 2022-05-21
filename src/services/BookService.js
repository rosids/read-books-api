
const getBooks = require('../models/BookModel');

const getAllBooks = async () => {
  const books = await getBooks();
  return books;
};

module.exports = getAllBooks;