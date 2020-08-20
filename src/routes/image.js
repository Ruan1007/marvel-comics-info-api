/**
 * Arquivo: src/routes/image.js
 * Descrição: arquivo responsável pela configuração de rota do upload da imagem.
 */
const { Router } = require('express');
const multer = require('multer');
const imageController = require('../controllers/image.controller');
const multerConfig = require('../config/multer');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.post(
  '/upload-profile-image',
  authMiddleware,
  multer(multerConfig).single('image'),
  imageController.uploadProfileImage
);

module.exports = router;
