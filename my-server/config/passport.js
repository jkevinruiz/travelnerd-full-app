var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});
passport.use(
 new GoogleStrategy(
  {
   clientID: "356661816765-s8knscv1b53m9fr1tv2d0r217vmqf59e.apps.googleusercontent.com",
   clientSecret: "THYSigghFnxLEF2H44m90HWA",
   callbackURL: "http://localhost:4500/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   var userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };
   done(null, userData);
  }
 )
);