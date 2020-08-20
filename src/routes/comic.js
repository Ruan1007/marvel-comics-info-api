/**
 * Arquivo: src/routes/comic.js
 * Descrição: arquivo responsável pela configuração de rota do comic.
 */
const { Router } = require('express');

const comicController = require('../controllers/comic.controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, comicController.saveOrUpdate);
router.get('/', authMiddleware, comicController.getRatedComicsByUserId);

module.exports = router;
