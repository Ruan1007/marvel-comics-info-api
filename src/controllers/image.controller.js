const imageService = require('../services/image.service');

exports.uploadProfileImage = async (req, res) => {
  const userId = req.userId;
  const {originalname: name, size, key, location: url = ''} = req.file;
  const user = await imageService.saveProfileImage(
    {name, size, key, url},
    userId
  );
  return res.send(user);
};
