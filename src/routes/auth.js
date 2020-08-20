/**
 * Arquivo: src/routes/auth.js
 * Descrição: arquivo responsável pela configuração de rota de autenticação.
 */
const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
