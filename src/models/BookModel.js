const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  name: { type: String, required: [true, 'O nome é obrigatório'] },
  comment: { type: String},
});

const bookModel = model('books', bookSchema);

const getBooks = async () =>  {
  const books = await bookModel.find().lean(); // lean = boa prática de performance, para retornar um JSON text-plain ao invés de objetos Mongoose complexos
  return books;
};

const createBook = async (item) => {
  const book = new bookModel(item);
  const newBook = await book.save();
  return newBook;
}

module.exports = {
  bookModel,
  getBooks,
  createBook,
};
