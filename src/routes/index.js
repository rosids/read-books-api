const Router  = require('express').Router;
const routes = Router();

const { getAll, createBook } = require('../controllers/BookController');
const { validateBook } = require('../middlewares');

routes.get('/books', getAll);

routes.post('/books', validateBook, createBook);

module.exports =  routes;
