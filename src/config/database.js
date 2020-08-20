/**
 * Arquivo: config/database.js
 * Descrição: arquivo responsável pelas configurações de conexão da aplicação: MongoDB
 */
const mongoose = require('mongoose');

const database = mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = database;
