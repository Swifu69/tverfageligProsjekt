const bcrypt = require("bcrypt");
const { Router } = require("express");
const user = require("../models/user.js");
const router = Router();

router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
	const body = req.body;
	console.log(body);
});

module.exports = router;
