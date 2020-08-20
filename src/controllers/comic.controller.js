const comicService = require('../services/comic.service');

exports.saveOrUpdate = async (req, res) => {
  try {
    const comic = req.body;
    comic.userId = req.userId;
    return res.send(await comicService.saveOrUpdate(comic));
  } catch (err) {
    return res
      .status(err.code ? err.code : 500)
      .send({ message: `Registro falhou. ${err.message}` });
  }
};

exports.getRatedComicsByUserId = async (req, res) => {
  try {
    return res.send(await comicService.getRatedComicsByUserId(req.userId));
  } catch (err) {
    return res
      .status(err.code ? err.code : 500)
      .send({ message: `Consulta falhou. ${err.message}` });
  }
};
