const { model, Schema, isValidObjectId } = require('mongoose');

const bookSchema = new Schema({
  name: { type: String, required: [true, 'O nome é obrigatório'] },
  comment: { type: String},
});

const bookModel = model('books', bookSchema);

const getBooks = async () =>  {
  const books = await bookModel.find().select('-__v').lean();
  // lean = boa prática de performance, para retornar um JSON text-plain ao invés de objetos Mongoose complexos
  // select('-campo') oculta campo d0 retorno da resposta
  return books;
};

const getId = async (id) =>  {
  if(!isValidObjectId(id)) return { isInvalidId: true, message: 'O id informado é inválido.' };
  
  const book = await bookModel.findById(id).select('-__v').lean();

  if(!book) return { idNotFound: true, message: 'Não foi possível encontrar o livro.'};

  return book;
};

const createBook = async (item) => {
  const book = new bookModel(item);
  const newBook = await book.save();
  return newBook;
}

const deleteBook = async (id) => {
  const validId = await getId(id);

  if(validId.isInvalidId || validId.idNotFound) {
    return validId;
  }

  const deleteBook = await bookModel.deleteOne({ _id: id });
  console.log(deleteBook);
  if(!deleteBook.deletedCount) {
    return ({ isDelete: true, message: 'Não foi possível excluir o livro.'});
  }

  return 'Livro deletado com sucesso!'
};

module.exports = {
  bookModel,
  getBooks,
  getId,
  createBook,
  deleteBook,
};
