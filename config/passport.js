//requiring passport strategy
const passportLocalStrat = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

const passportConfig = (passport) => {
	passport.use(
		new passportLocalStrat(
			//defining the default username field
			{ usernameField: "email" },
			async (email, password, done) => {
				//checking for a matching email in the db
				let user = await User.findOne({ email: email });
				if (user) {
					//comparing string input-password with hashed and salted password
					bcrypt.compare(password, user.password, (err, match) => {
						if (err) throw err;
						if (match) return done(null, user);
						else
							return done(null, false, {
								message: "email or password was incorrect",
							});
					});
				} else {
					return done(null, false, { message: "user not found" });
				}
			}
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await User.findById(id);
		done(null, user);
	});
};

module.exports = passportConfig;
