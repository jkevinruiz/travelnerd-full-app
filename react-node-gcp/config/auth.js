const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = requre('../models/Login.js');

const localOptions = {
	usernameField : 'email',
	passwordField : 'password'
};

const strategy = new LocalStrategy(localOptions, async (email, password, done) => {
	try {
		// Find the user in in the DB associated with the email provided by the user
		const userChosen = await UserModel.findOne({email: email});
		
		if (!userChosen) {
			// If the user isn't found in the database, set flash message
			return done(null, false, {message : 'Email not found'});
		}
		// Validate password and make sure it matches with the corresponding hash stored in the database. If the pwds match, it retuns a value of true.
		const validate = await userChose.isValidPassword(password);
		if (!validate){
			return done(null, userChosen, {message : 'Wrong Password'});
		}
		
		// Send the user information to the next middleware
		return done(null, userChosen, {message : 'Logged in successfully'});
	} catch (error) {
		return done(error);
	}
});

// for localLogin, use our strategy to handle user login
passportuse('localLogin', strategy);

// save email in session data
passport.serializeUser( (user, done) => done(null, user.email) );

passport.deserializeUser( (email, done) => {
	UserModel.findOne({email: email}, (err, user) => done(err, user) );
});