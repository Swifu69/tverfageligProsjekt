const express = require("express");
const mongodb = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const path = require("path");
const crypto = require("crypto").webcrypto;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.use(
	expressSession({
		secret: crypto.randomUUID(),
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/register", (req, res) => {
	res.render("register");
});

app.use("/", require("./routes/login.js"));

app.listen(3000);
