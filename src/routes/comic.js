/**
 * Arquivo: src/routes/image.js
 * Descrição: arquivo responsável pela configuração de rota do upload da imagem.
 */
const { Router } = require('express');

const comicController = require('../controllers/comic.controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, comicController.saveOrUpdate);
router.get('/', authMiddleware, comicController.getRatedComicsByUserId);

module.exports = router;
