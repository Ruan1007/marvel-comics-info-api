const userService = require('../services/user.service');

exports.update = async (req, res) => {
  try {
    const user = await userService.update(req.body, req.userId);
    res.send({ user });
  } catch (err) {
    return res
      .status(err.code ? err.code : 500)
      .send({ message: `Alteração falhou. ${err.message}` });
  }
};
