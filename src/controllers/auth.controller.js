const authService = require('../services/auth.service');
const generateToken = require('../utils/Auth');

exports.register = async (req, res) => {
  try {
    const user = await authService.signUp(req.body);
    const token = generateToken({ id: user.id });
    res.status(201).json({ user, token });
  } catch (err) {
    return res
      .status(err.code ? err.code : 500)
      .send({ message: `Registro falhou. ${err.message}` });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    const token = generateToken({ id: user.id });
    res.status(200).json({ user, token });
  } catch (err) {
    return res
      .status(err.code ? err.code : 500)
      .send({ message: `Login falhou. ${err.message.message}` });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body);
    return res.status(200).json({ message: 'Email enviado' });
  } catch (err) {
    return res
      .status(err.code)
      .send({ message: `Email não foi enviado. ${err.message} ` });
  }
};
