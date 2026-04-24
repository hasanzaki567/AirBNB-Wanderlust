const User = require("../models/user.js");

module.exports.renderSignup =  (req, res) => {
    res.render("users/SignUp.ejs");
}

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const newregisteredUser = await User.register(newUser, password);
        // console.log(newregisteredUser);
        req.login(newregisteredUser, err => {
            if (err){return next(err)} 
          req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings"); 
        });
      
    } catch (e) {
    req.flash("error", e.message);
    res.redirect("/SignUp");
}
}

module.exports.renderLogin =  (req, res) => {
    res.render("users/login.ejs");
}

module.exports.Login =   (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/listings");
}

module.exports.logOut =  (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you have logged out successfully");
        res.redirect("/listings");
    });
}