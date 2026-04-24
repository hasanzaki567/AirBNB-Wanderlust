const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signUp")
    .get(userController.renderSignup)
    .post(wrapAsync(userController.signUp));

router.route("/login")
    .get(userController.renderLogin)
    .post(savedRedirectUrl, passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login"
    }), userController.Login);


router.get("/logOut", userController.logOut);



module.exports = router;    
