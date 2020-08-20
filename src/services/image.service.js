const Image = require('../models/image.model');
const User = require('../models/user.model');

module.exports = {
  save(image) {
    return Image.create(image);
  },
  getById(imageId) {
    return Image.findOne({ _id: imageId });
  },
  async saveProfileImage(image, userId) {
    const { url } = await Image.create(image);
    return User.findOneAndUpdate(
      { _id: userId },
      { image: url },
      { new: true }
    );
  },
};
