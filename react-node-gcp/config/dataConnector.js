require('dotenv').config();
console.log(process.env.MONGO_URL);
const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("Now connected to mongo");
    });
};

module.exports = {
    connect
};