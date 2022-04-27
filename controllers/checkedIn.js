function userIsAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/error");
}

module.exports = userIsAuth;
