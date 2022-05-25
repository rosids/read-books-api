const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const database = require('./models/connection');
const middlewares = require('./middlewares');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(middlewares.error);

const PORT = process.env.PORT || 3000;

database.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
  });
});
