const userService = require('../services/user.service');

exports.update = async (req, res) => {
  const userId = req.userId;
  const user = await userService.update(req.body, userId);
  res.send({user});
};
