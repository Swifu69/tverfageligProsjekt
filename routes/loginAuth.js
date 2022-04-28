const { Router } = require("express");
//requiring authentication controller
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
