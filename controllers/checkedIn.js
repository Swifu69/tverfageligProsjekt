function userIsAuth(req, res, next) {
	if (req.isAuthenticated()) {
		req.userAuth = true;
		return next();
	}
	res.redirect("/error");
}

module.exports = userIsAuth;
