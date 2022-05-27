
const { getBooks, getId, createBook, deleteBook, updatedBook } = require('../models/BookModel');

const getAllBooks = async (page = 0, perPage = 6) => {
  // Number(page) - 1 = porque o array começa na posição 0. Ex: se for solicitado a página 1, a posição 1 no array equivale a 0.
  page = Math.max(0, Number(page) - 1);
  const books = await getBooks(page, Number(perPage));
  return books[0];
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