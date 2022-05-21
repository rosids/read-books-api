const getAllBooks = require("../services/BookService");

const getAll = async (_req, res) => {
  const books = await getAllBooks();
  console.log('controller');
  res.status(200).send(books);
};

module.exports = getAll;
