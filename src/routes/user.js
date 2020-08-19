/**
 * Arquivo: src/routes/user.js
 * Descrição: arquivo responsável pela configuração de rota do usuário.
 */
const {Router} = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.put('/', authMiddleware, userController.update);

module.exports = router;
