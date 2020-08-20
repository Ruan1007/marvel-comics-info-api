const userService = require('../services/user.service');

exports.update = async (req, res) => {
  const user = await userService.update(req.body, req.userId);
  res.send({user});
};
