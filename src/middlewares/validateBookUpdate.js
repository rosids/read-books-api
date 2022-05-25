const mongoose = require('mongoose');

module.exports = (req, _res, next) => {
  const { name, comment } = req.body;

  const validate = mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');

  if (!validate(name) || !name.trim().length) {
    const error = {
      isUpdated: true,
      message: 'Nome não pode ser vazio.',
    };
    return next(error);
  }

  if(validate(comment) && !comment.trim().length) {
    const error = {
      isUpdated: true,
      message: 'Comentário não pode ser vazio.',
    };
    return next(error);
  }

  next();
};