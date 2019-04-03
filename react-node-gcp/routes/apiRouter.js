const express = require('express');
const ImageModel = require('../models/Image.js');

const router = express.Router();

router.get('/images', (req, resp) => {
    ImageModel.find({}, (err, data) => {
        if (err) {
            resp.json({ Error: 'Images not found'});
        } else {
            resp.json(data);
        }
    });
});

router.get('/image/:id', (req, resp) => {
    ImageModel.find({id: req.params.id}, (err, data) => {
        if (err) {
            resp.json({Error: 'Image not found'});
        } else {
            console.log(data);
            resp.json(data);
        }
    });
});

module.exports = router;