const { getAllBooks, getBookId, create } = require("../services/BookService");

const getAll = async (_req, res) => {
  const books = await getAllBooks();
  res.status(200).send(books);
};

const getId = async (req, res, next) => {
  const { id } = req.params;

  const book = await getBookId(id);

  if(book.isInvalidId || !book.idNotFound) {
    return next(book);
  }

  res.status(200).json(book);
};

const createBook = async (req, res) => {
  const { name, comment } = req.body;
  const newBook = await create({ name, comment });
  console.log(newBook)
  res.status(201).json({
    status: 201,
    message: `O ${newBook.name} criado com sucesso.`
  });
};

module.exports = {
  getAll,
  getId,
  createBook,
};
