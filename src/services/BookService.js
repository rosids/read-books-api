
const { getBooks, getId, createBook, deleteBook, updatedBook } = require('../models/BookModel');

const getAllBooks = async () => {
  const books = await getBooks();
  return books;
};

const getBookId = async (id) => {
  const books = await getId(id);
  return books;
};

const create = async (book) => await createBook(book);

const removeBook = async (id) => await deleteBook(id);

const updated = async (id, book) => await updatedBook(id, book);

module.exports = {
  getAllBooks,
  getBookId,
  create,
  removeBook,
  updated,
};