const { getAllBooks, getBookId, create, removeBook, updated } = require("../services/BookService");

const getAll = async (req, res) => {
  const { page, perPage } = req.query;
  const books = await getAllBooks(page, perPage);
  res.status(200).json(books);
};

const getId = async (req, res, next) => {
  const { id } = req.params;

  const book = await getBookId(id);

  if(book.isInvalidId || book.idNotFound) {
    return next(book);
  }

  res.status(200).json(book);
};

const createBook = async (req, res) => {
  const { name, comment } = req.body;
  const newBook = await create({ name, comment });
  res.status(201).json({
    status: 201,
    message: `${newBook.name} foi criado com sucesso.`
  });
};

const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  if(!id) {
    return res.status(404).json({ error: { message: 'O ID do usuário está ausente.'} });
  }

  const deleteBook = await removeBook(id);

  if(deleteBook.isInvalidId || deleteBook.idNotFound || deleteBook.isDelete) {
    return next(deleteBook);
  }

  res.status(200).json({ statusCode: 200, message: deleteBook });
};

const updatedBook = async (req, res, next) => {
  const { id } = req.params;
  const { name, comment } = req.body;

  if(!id) {
    return res.status(404).json({ error: { message: 'O ID do usuário está ausente.'} });
  }

  const updatedBook = await updated(id, { name, comment });

  if(updatedBook.isInvalidId || updatedBook.idNotFound || updatedBook.isUpdated) {
    return next(updatedBook);
  }

  res.status(200).json({ statusCode: 200, message: updatedBook });
};

module.exports = {
  getAll,
  getId,
  createBook,
  deleteBook,
  updatedBook,
};
