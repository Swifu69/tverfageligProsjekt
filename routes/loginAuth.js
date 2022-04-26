const { Router } = require("express");
const authenticate = require("../controllers/authentication");
const router = Router();

router
	.route("/login")
	.get((req, res) => {
		res.render("login");
	})
	.post((req, res, next) => {
		authenticate.authenticateControll(req, res, next);
	});

module.exports = router;
