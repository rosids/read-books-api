const Router  = require('express').Router;
const routes = Router();

const { getAll, getId, createBook, deleteBook, updatedBook } = require('../controllers/BookController');
const { validateBook, validateBookUpdate } = require('../middlewares');

routes.get('/books/:id', getId);

routes.get('/books', getAll);

routes.post('/books', validateBook, createBook);

routes.patch('/books/:id', validateBookUpdate, updatedBook);

routes.delete('/books/:id', deleteBook);

module.exports =  routes;
