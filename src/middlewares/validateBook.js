const {  bookModel } = require('../models/BookModel');

module.exports = async (req, res, next) => {
  const book = new bookModel(req.body);
  const err = await book.validateSync();
  if(err) {
    return res.status(404).json({
      error: {
        message: err.errors['name'].message,
      },
    });
  }
  next();
};