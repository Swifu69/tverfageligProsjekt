const bcrypt = require("bcrypt");
const { Router } = require("express");
const userData = require("../models/user.js");
const router = Router();

router.get("/register", (req, res) => res.render("register"));

router.post("/register", async (req, res) => {
	try {
		const body = req.body;

		if (!(body.email && body.password)) {
			req.flash("errormsg", "Missing credentials");
			res.redirect("/register");
		} else {
			const user = new userData(body);
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(body.password, salt);
			await user.save();
			req.flash("successmsg", "User created!");
			res.redirect("/login");
		}
	} catch (err) {
		res.status(500).render("register", { errorMessage: "Duplicated Email" });
		console.log(err);
	}
});

module.exports = router;
