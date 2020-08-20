/**
 * Arquivo: src/services/comic.service.js
 * Descrição: arquivo responsável pelas regras de negócio do comics.
 */
const Comic = require('../models/comic.model');
const { getRatedComicsByUserId } = require('../controllers/comic.controller');

const save = (comic) => {
  return Comic.create({
    userId: comic.userId,
    isLiked: comic.isLiked,
    url: comic.url,
  });
};

const update = (comic) => {
  return Comic.findOneAndUpdate(
    { userId: comic.userId, url: comic.url },
    comic,
    { new: true }
  );
};

const hasComicFavSaved = async (comic) => {
  const comicDB = await Comic.findOne({ userId: comic.userId, url: comic.url });
  if (comicDB) {
    return true;
  }
  return false;
};

module.exports = {
  async saveOrUpdate(comic) {
    if (await hasComicFavSaved(comic)) {
      return update(comic);
    }
    return save(comic);
  },
  getRatedComicsByUserId(userId) {
    return Comic.find({ userId });
  },
};
