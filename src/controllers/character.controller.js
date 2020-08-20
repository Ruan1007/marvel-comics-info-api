const characterService = require('../services/character.service');

exports.saveOrUpdate = async (req, res) => {
  try {
    const character = req.body;
    character.userId = req.userId;
    return res.send(await characterService.saveOrUpdate(character));
  } catch (err) {
    return res
      .status(err.code ? err.code : 500)
      .send({ message: `Registro falhou. ${err.message}` });
  }
};

exports.getRatedCharactersByUserId = async (req, res) => {
  try {
    return res.send(
      await characterService.getRatedCharactersByUserId(req.userId)
    );
  } catch (err) {
    return res
      .status(err.code ? err.code : 500)
      .send({ message: `Consulta falhou. ${err.message}` });
  }
};
