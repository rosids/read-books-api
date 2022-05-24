
const {getBooks, createBook} = require('../models/BookModel');

const getAllBooks = async () => {
  const books = await getBooks();
  return books;
};

const create = async (book) => await createBook(book);

module.exports = {
  getAllBooks,
  create,
};