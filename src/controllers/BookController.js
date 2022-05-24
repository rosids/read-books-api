const { getAllBooks, getBookId, create, removeBook } = require("../services/BookService");

const getAll = async (_req, res) => {
  const books = await getAllBooks();
  res.status(200).send(books);
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
    message: `O ${newBook.name} criado com sucesso.`
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

  res.status(200).send(deleteBook);
};

module.exports = {
  getAll,
  getId,
  createBook,
  deleteBook,
};
