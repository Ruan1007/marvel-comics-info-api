/**
 * Arquivo: src/services/image.model.js
 * Descrição: arquivo responsável pelo model de imagem.
 */
const { mongoose, Schema } = require('mongoose');
const aws = require('aws-sdk');

const s3 = new aws.S3();

const ImageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

ImageSchema.pre('remove', function () {
  return s3
    .deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: this.key,
    })
    .promise()
    .then((response) => {
      console.log(response.status);
    })
    .catch((response) => {
      console.log(response.status);
    });
});

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
