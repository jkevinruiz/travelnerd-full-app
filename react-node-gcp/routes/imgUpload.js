'use strict';
const {Storage} = require('@google-cloud/storage');

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
    const gcsname2 = "/square/" + req.file.originalname;
    const file = bucket.file(gcsname);
    const file2 = bucket.file(gcsname2);
  
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

  ImgUpload.uploadToGcsSquare = (req, res, next) => {
    if(!req.file) return next();
  
    // Can optionally add a path to the gcsname below by concatenating it before the filename
    const gcsname = "/square/" + req.file.originalname;
    const file = bucket.file(gcsname);
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        destination: "square"
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