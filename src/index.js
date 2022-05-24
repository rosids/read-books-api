const express = require("express");
const routes = require("./routes");
const app = express();
const database = require('./models/connection');
const middlewares = require('./middlewares');

app.use(express.json());

app.use(routes);

app.use(middlewares.error);

const PORT = process.env.PORT || 3000;

database.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
  });
});
