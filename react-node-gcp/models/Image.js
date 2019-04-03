const mongoose = require('mongoose');
//Image Schema according to structure of Image collection in MongoDBAtlas
const imageSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    location: {
        iso: String,
        country: String,
        city: String,
        cityCode: Number,
        continent: String,
        latitude: Number,
        longitude: Number
    },
    user: {
        userid: Number,
        picture: {
            large: String,
            thumbnail: String
        },
        firstname: String,
        lastname: String
    },
    exif: {
        make: String,
        model: String,
        exposure_time: String,
        aperture: String,
        focal_length: String,
        iso: Number
    },
    filename: String,
    colors: [
        {
            hex: String,
            name: String
        }
    ]
});
module.exports = mongoose.model('Image', imageSchema);