const mongodb = require("mongoose");

const userSchema = new mongodb.Schema({
	username: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ["user", "admin"], default: "user" },
});

const user = mongodb.model("user", userSchema);

module.exports = user;
