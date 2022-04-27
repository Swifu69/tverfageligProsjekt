//requiring encryption module
const bcrypt = require("bcrypt");
const { Router } = require("express");
const userData = require("../models/user.js");
const router = Router();

//render register when getting /register
router.get("/register", (req, res) => res.render("register"));

//post when button is pressed and async function
router.post("/register", async (req, res) => {
	//try catch for some error handling and validation
	try {
		//getting that juicy body
		const body = req.body;
		//if its submited without any password or email send err with flash feedback
		if (!(body.email && body.password)) {
			req.flash("errormsg", "Missing credentials");
			res.redirect("/register");
		} else {
			//Take body in model and save data on user variable
			const user = new userData(body);
			//make a 10 rounds salt and wait
			const salt = await bcrypt.genSalt(10);
			//take salt, encrypt the password from the body and put salt in the end of the hashed password
			user.password = await bcrypt.hash(body.password, salt);
			//save user in database
			await user.save();
			//User created feedback when redirecting to login
			req.flash("successMessage", "User created!");
			res.redirect("/login");
		}
	} catch (err) {
		//if err throw error.
		res.status(500).render("register", { errorMessage: "Duplicated Email" }); // only error i can get
	}
});

module.exports = router;
