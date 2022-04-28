const express = require("express");
const mongodb = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
//path to make files relative to public
const path = require("path");
const flash = require("connect-flash");
//built in node module to crypt shit (i use this to make random dirty little secrets)
const crypto = require("crypto").webcrypto;
//middleware that returns undefined or null to check if a user is authorized
const checkedIn = require("./controllers/checkedIn.js");

const app = express();
//get config that has the path to the db, secret and port
const config = require("./config/config.json");
const passportConfig = require("./config/passport.js");

//getting that passport config
passportConfig(passport);

app.use(express.urlencoded({ extended: true }));
//static files kek
app.use(express.static(path.join(__dirname, "/public")));

//session secret making with resave.
app.use(
	expressSession({
		secret: crypto.randomUUID(),
		resave: true,
		saveUninitialized: true,
	})
);

//connecting to mongo and using the config.json to import some stuff
mongodb
	.connect(config.mongodb_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("...connected to the database!"))
	.catch(console.error);

app.use(passport.initialize());
app.use(passport.session());

//using flash for those sick feedbacks
app.use(flash());

//defining thing for flash
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("errorMessage");
	res.locals.successMessage = req.flash("successMessage");
	res.locals.error = req.flash("error");

	next();
});

//setting ejs as my view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

//check if user is authorized with middleware
app.get("/documents", checkedIn, (req, res) => {
	res.render("documents");
});

app.get("/documents", (req, res) => {
	res.render("documents", {
		user: req.user,
		checkedIn: req.isAuthenticated(),
	});
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/register", (req, res) => {
	res.render("register");
});

//logout that is called by a button. button appears only if user is logged in
app.get("/logout", (req, res) => {
	req.logout();
	req.flash("successMessage", "You have been logged out");
	res.redirect("/");
});
app.get("/error", (req, res) => {
	res.render("error");
});

//my routes
app.use("/", require("./routes/register.js"));
app.use("/", require("./routes/loginAuth.js"));
app.use((req, res) => {
	res.status(404).render("error", { message: "404 lol :laughing emoji:" });
});
//port config with config.json
app.listen(isNaN(config.port) ? 3000 : config.port, () =>
	console.log("http://localhost:3000")
);
