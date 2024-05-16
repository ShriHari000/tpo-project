const mongoose = require("mongoose");



const componyschema = new mongoose.Schema({
	CompanyName: {
		type: String,
		required: [true, "student Name is required"],
		unique: [true, "student Name Already Exists"],
	},
	criteria: {
		type: String,
		required: [true, "User criteria required"],
		
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
		lowercase: true,
		unique: [true, "Email already exists"],
	},
	address: {
		type: String,
		required: [true, "Location can't be blank"],
	},
	package: {
		type: String,
	},
	Rskills: {
		type: String,
		required: [true, "description can't be blank"],
	},
	about: {
		type: String,
		required: [true, "description can't be blank"],
	},
});


module.exports = mongoose.model("Compony", componyschema);

