/**
 * Arquivo: app.js
 * Descrição: arquivo responsável por toda configuração da aplicação.
 */
require('dotenv/config');
require('./config/database');
const express = require('express');
const app = express();
const cors = require('cors');

/**
 * Importação das rotas
 */
const auth = require('./routes/auth');
const image = require('./routes/image');
const user = require('./routes/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/auth', auth);
app.use('/image', image);
app.use('/user', user);

app.get('/', (req, res) => {
  res.status(200).send({message: 'Aplicação está rodando.'});
});

module.exports = app;
