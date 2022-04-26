const express = require("express");
const mongodb = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const path = require("path");
const flash = require("connect-flash");
const crypto = require("crypto").webcrypto;

const app = express();

const config = require("./config/config.json");
const passportConfig = require("./config/passport.js");

passportConfig(passport);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.use(
  expressSession({
    secret: crypto.randomUUID(),
    resave: true,
    saveUninitialized: true,
  })
);

mongodb
  .connect(config.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("...connected to the database!"))
  .catch(console.error);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.successMessage = req.flash("successMessage");
  res.locals.error = req.flash("error");

  next();
});

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

app.use("/", require("./routes/register.js"));
app.use("/", require("./routes/loginAuth.js"));

app.listen(3000);
