const Router  = require('express').Router;
const routes = Router();

const { getAll, getId, createBook, deleteBook } = require('../controllers/BookController');
const { validateBook } = require('../middlewares');

routes.get('/books/:id', getId);

routes.get('/books', getAll);

routes.post('/books', validateBook, createBook);

routes.delete('/books/:id', deleteBook);

module.exports =  routes;
