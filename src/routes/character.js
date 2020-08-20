/**
 * Arquivo: src/routes/character.js
 * Descrição: arquivo responsável pela configuração de rota do character.
 */
const { Router } = require('express');

const characterController = require('../controllers/character.controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, characterController.saveOrUpdate);
router.get('/', authMiddleware, characterController.getRatedCharactersByUserId);

module.exports = router;
