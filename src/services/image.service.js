const Image = require('../models/image.model');
const User = require('../models/user.model');

module.exports = {
  async save(image) {
    return await Image.create(image);
  },
  async getById(imageId) {
    return await Image.findOne({_id: imageId});
  },
  async saveProfileImage(image, userId) {
    const {url} = await Image.create(image);
    return await User.findOneAndUpdate(
      {_id: userId},
      {image: url},
      {new: true}
    );
  }
};
