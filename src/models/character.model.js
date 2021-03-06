/**
 * Arquivo: src/services/character.model.js
 * Descrição: arquivo responsável pelo model de characters.
 */
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CharacterSchema = new Schema({
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
  characterId: {
    type: Number,
    required: true,
  },
});

const Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
