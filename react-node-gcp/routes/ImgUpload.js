//https://medium.com/google-cloud/upload-images-to-google-cloud-storage-with-react-native-and-expressjs-61b8874abc49

'use strict';
const {Storage} = require('@google-cloud/storage');
const fs = require('file-system');

const gcs = new Storage({
    projectId: 'project-pixels',
    keyFilename: './keyfile.json'
  });
  
  const bucketName = 'project-pixels';
  const bucket = gcs.bucket(bucketName);
  
  function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
  }
  
  let ImgUpload = {};
  
  ImgUpload.uploadToGcs = (req, res, next) => {
    if(!req.file) return next();
  
    // Can optionally add a path to the gcsname below by concatenating it before the filename
    const gcsname = "/large/" + req.file.originalname;
    const file = bucket.file(gcsname);
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        destination: "large"
      }
    });
  
    stream.on('error', (err) => {
      console.log('gcp upload error');
      req.file.cloudStorageError = err;
      next(err);
    });
  
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  
    stream.end(req.file.buffer);
  }
  
  module.exports = ImgUpload;