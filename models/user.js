const mongodb = require("mongoose");

const userSchema = new mongodb.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["user", "admin"], default: "user" },
	},
	{
		toJSON() {
			return {
				email: this.email,
				role: this.role,
			};
		},
	}
);

const user = mongodb.model("user", userSchema);

module.exports = user;
