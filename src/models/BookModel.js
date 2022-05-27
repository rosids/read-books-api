const { model, Schema, isValidObjectId } = require('mongoose');

const bookSchema = new Schema({
  name: { type: String, required: [true, 'O nome é obrigatório'] },
  comment: { type: String},
});

const bookModel = model('books', bookSchema);

const getBooks = async (page, perPage) =>  {
  const books = await bookModel.aggregate([
    { $facet: {
      data: [
        { $group: {
          _id: '$_id',
          name : { $first: '$name' },
          comment : { $first: '$comment' },
        }},
        { $sort : { name : 1, _id: 1 } },
        { $skip: page * perPage },
        { $limit: perPage },
      ],
      metadata: [
        { $group: {
          _id: null,
          currentPage: { $first: page + 1},
          perPage: { $first: perPage },
          totalCount: { $sum: 1 },
        }},
        { $project: { 
          _id: 0,
          totalCount: 1,
          currentPage: 1,
          totalPages: { $ceil: { $divide: ['$totalCount', '$perPage'] } },
        }}
      ],
    }}
  ]);
  return books;
};

const getId = async (id) =>  {
  if(!isValidObjectId(id)) return { isInvalidId: true, message: 'O id informado é inválido.' };

  // lean = boa prática de performance, para retornar um JSON text-plain ao invés de objetos Mongoose complexos
  // select('-campo') oculta campo d0 retorno da resposta
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

  if(!deleteBook.deletedCount) {
    return ({ isDelete: true, message: 'Não foi possível excluir o livro.'});
  }

  return 'Livro deletado com sucesso!'
};

const updatedBook = async (id, book) => {
  const validId = await getId(id);

  if(validId.isInvalidId || validId.idNotFound) {
    return validId;
  }

  const updatedBook = await bookModel.findOneAndUpdate({ _id: id }, book, {
    rawResult: true, // retorna valor bruto do driver do mongo
  }).select('-__v');

  if(!updatedBook.lastErrorObject.updatedExisting) {
    return ({ isUpdated: true, message: 'Não foi possível atualizar o livro.'});
  }

  return 'Livro atualizado com sucesso!';
};

module.exports = {
  bookModel,
  getBooks,
  getId,
  createBook,
  deleteBook,
  updatedBook,
};
