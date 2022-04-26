const passport = require("passport");

function authenticateControll(req, res, next) {
	passport.authenticate("local", {
		successRedirect: "/register",
		failureRedirect: "/login",
	})(req, res, next)
}

module.exports = { authenticateControll };
