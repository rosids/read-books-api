const { getAllBooks, create } = require("../services/BookService");

const getAll = async (_req, res) => {
  const books = await getAllBooks();
  res.status(200).send(books);
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
  createBook,
};
