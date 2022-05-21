const Router  = require('express').Router;
const routes = Router();

const getAll = require('../controllers/BookController');

routes.get('/books', getAll);

module.exports =  routes;
