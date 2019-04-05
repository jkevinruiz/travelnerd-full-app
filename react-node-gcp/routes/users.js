const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("../config/auth")

// load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// load User model
const User = require("../models/User");

// @route POST api/users/register
// @desc Register new users
// @access Public
router.post('/register', function(req, res) {
  // Form validation
  const {errors, isValid} = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists"});
    }

    const newUser = new User({
      details: {firstname: req.body.name},
      email: req.body.email,
      password_bcrypt: req.body.password
    });

    bcrypt.hash(newUser.password_bcrypt, 10, (err, hash) => {
      if (err) throw err;
      newUser.password_bcrypt = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
});

// @route POST api/users/login
// @desc Login user and return user information
// @access Public
router.post(
  '/login',
  passport.authenticate('localLogin'),
  (req, res) => {

    const user = JSON.parse(JSON.stringify(req.user)); // hack???
    const cleanUser = Object.assign({}, user);
    res.json({ user: cleanUser });
  }
);

module.exports = router;
