/**
 * Arquivo: src/middlewares/auth.js
 * Descrição: arquivo responsável pela configuração do middleware de autenticação da aplicação.
 */
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({message: 'Nenhum token informado'});
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({message: 'Erro com o token informado'});
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({message: 'Token com formatação incorreta'});
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({message: 'Token inválido'});
    }

    req.userId = decoded.id;
    return next();
  });
};
