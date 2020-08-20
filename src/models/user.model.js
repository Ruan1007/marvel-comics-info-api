/**
 * Arquivo: src/services/image.model.js
 * Descrição: arquivo responsável pelo model de usuário.
 */
const { mongoose, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async (next) => {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.pre('findOneAndUpdate', async (next) => {
  if (this.getUpdate().newPassword) {
    const hash = await bcrypt.hash(this.getUpdate().newPassword, 10);
    this.getUpdate().password = hash;
  }
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
