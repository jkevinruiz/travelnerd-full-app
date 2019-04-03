const express = require('express');
const ImageModel = require('../models/Image.js');

const router = express.Router();

router.get('/images', (req, resp) => {
    ImageModel.find({}, (err, data) => {
        if (err) {
            resp.json({ Error: err});
        } else {
            console.log(data);
            resp.json(data);
        }
    });
});

module.exports = router;