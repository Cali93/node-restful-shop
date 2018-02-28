const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserController = require("../controllers/user");
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Profile
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, UserController.delete_user);

module.exports = router;
