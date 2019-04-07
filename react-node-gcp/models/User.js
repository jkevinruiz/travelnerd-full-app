const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    id: String,
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

// Check the user's credentials
UserSchema.methods.isValidPassword = async function(formPassword) {
	const user = this;
	const hash = user.password_bcrypt;

	// hashes the password sent and checks against the DB.
  console.log("Comparing passwords");
  console.log(formPassword);
  console.log(hash);
	const compare = await bcrypt.compare(formPassword, hash);
  console.log(compare);
	return compare;
}

const User = mongoose.model('users', UserSchema);

module.exports = User;
