const express = require('express');
const ImageModel = require('../models/Image.js');
const LoginModel = require('../models/User.js');
const urlencodedParser = express.urlencoded({ extended: false })
const router = express.Router();

/* Provide JSON for all images */
router.get('/images', (req, resp) => {
    ImageModel.find({}, (err, data) => {
        if (err) {
            resp.json({ Error: 'Images not found'});
        } else {
            resp.json(data);
        }
    });
});

/* Provide JSON for the specified image id */
/* MUST SUPPLY VALID API KEY??? FOUND IN users.json/logins.json dataset*/
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

/* PUT REQUEST NOT WORKING YET */
/* TESTING LINK: /api/image/30386ea7-d672-4460-b5df-ca0cf9759ea2 */
/* Modify the image data in MongoDB Atlas Database */
/* NEEDS VALID AUTH TOKEN */
router.put('/image/:id', urlencodedParser, (req, resp) => {
    // console.log("REQQUERY: " + req.query.title);
    // ImageModel.findById({id: req.params.id}, req.body.firstname, {new: true}, (err, data) => {
    //     if(err) {
    //         return resp.status(500).send(err);
    //     } 
    //     return resp.send(data);
    //     console.log(data);
    //     resp.send(data);
    // });
    // ImageModel.updateOne({id: req.params.id}, function(err, image) {
    //     image.firstname = "john";
    //     image.save(function(err) {
    //         if(err) {
    //             console.error("ERROR!");
    //         }
    //     });
    // });

    ImageModel.updateOne( {id: req.params.id},  
        {
            title: req.body.title, 
            description: req.body.description,
            'location.country': req.body.country,
            'location.city': req.body.city,
            'location.longitude': req.body.longitude,
            'location.latitude': req.body.latitude,
            'exif.make': req.body.exmake,
            'exif.model': req.body.exmodel,
            'exif.exposure_time': req.body.exptime,
            'exif.aperture': req.body.exaperture,
            'exif.focal_length': req.body.exfocal,
            'exif.iso': req.body.exiso,

        }, 
        function(err, data) {
            if (err) {
                return resp.json({Error: err});
            }
            return resp.json({Message: "Success"});
        });
});

/* Add a new image to MongoDB Atlas Database */
/* WORKS BUT NEEDS VALID AUTH TOKEN FOR LOGIN FUNCTIONALITY*/
router.post('/image/:id', urlencodedParser, (req, resp) => {
    let imageRecord = new ImageModel({
        id: req.body.id, 
        title: req.body.title,
        description: req.body.description,
        location: {
            iso: req.body.iso,
            country: req.body.country,
            city: req.body.city,
            cityCode: req.body.cityCode,
            continent: req.body.continent,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
        user: {
            userid: req.body.userid,
            picture: {
                large: req.body.large,
                thumbnail: req.body.thumbnail
            },
            firstname: req.body.firstname,
            lastname: req.body.lastname
        },
        exif: {
            make: req.body.make,
            model: req.body.model,
            exposure_time: req.body.exposure_time,
            aperture: req.body.aperture,
            focal_length: req.body.focal_length,
            iso: req.body.exifiso
        },
        filename: req.body.filename,
        colors: [
            {
                hex: req.body.hex1,
                name: req.body.name1
            },
            {
                hex: req.body.hex2,
                name: req.body.name2
            },
            {
                hex: req.body.hex3,
                name: req.body.name3
            },
            {
                hex: req.body.hex4,
                name: req.body.name4
            }
        ]
    });
    imageRecord.save((err, imageR) => {
        if (err) {
            console.log("ERROR: INSERT IS WRONG");
        } else {
            console.log(imageR.title + " Inserted on images Collection");
        }
    });    
});

router.get('/logins', (req, resp) => {
    LoginModel.find({}, (err, data) => {
        if (err) {
            resp.json({ Error: 'Login Data not found'});
        } else {
            resp.json(data);
        }
    });
});

module.exports = router;