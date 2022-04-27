const passport = require("passport");

function authenticateControll(req, res, next) {
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})(req, res, next);
}

module.exports = { authenticateControll };
