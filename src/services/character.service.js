/**
 * Arquivo: src/services/character.service.js
 * Descrição: arquivo responsável pelas regras de negócio do comics.
 */
const Character = require('../models/character.model');

const save = (character) => {
  return Character.create({
    userId: character.userId,
    isLiked: character.isLiked,
    url: character.url,
  });
};

const update = (character) => {
  return Character.findOneAndUpdate(
    { userId: character.userId, url: character.url },
    character,
    { new: true }
  );
};

const hasRateCharacterSaved = async (character) => {
  const characterDB = await Character.findOne({
    userId: character.userId,
    url: character.url,
  });
  if (characterDB) {
    return true;
  }
  return false;
};

module.exports = {
  async saveOrUpdate(character) {
    if (await hasRateCharacterSaved(character)) {
      return update(character);
    }
    return save(character);
  },
  getRatedCharactersByUserId(userId) {
    return Character.find({ userId });
  },
};
