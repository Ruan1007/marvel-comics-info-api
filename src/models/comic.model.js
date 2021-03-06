/**
 * Arquivo: src/services/comic.model.js
 * Descrição: arquivo responsável pelo model de comics.
 */
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ComicSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  isLiked: {
    type: Boolean,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  comicId: {
    type: Number,
    required: true,
  },
});

const Comic = mongoose.model('Comic', ComicSchema);
module.exports = Comic;
