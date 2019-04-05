const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    id: Number,
    details: {
        firstname: String,
        lastname: String,
        city: String,
        country: String
    },
    email: String,
    password_bcrypt: String,
    apikey: String
});
module.exports = mongoose.model('Login', loginSchema);