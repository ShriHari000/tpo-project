const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	studentName: {
		type: String,
		required: [true, "student Name is required"],
		
	},
	phone: {
		type: String,
		required: [true, "User phone number required"],
		min: [10, "Too Few. Not valid number. Eg. 251-XXX-XXXXXX"],
		max: [12, "Too long. Not valid number. Eg. 251-XXX-XXXXXX"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
		lowercase: true,
		unique: [true, "Email already exists"],
	},
	College: {
		type: String,
		required: [true, "Location can't be blank"],
	},
	CGPA: {
		type: String,
		required: [true, "cgpa is required"],

	},
	PRN: {
		type: String,
		unique: [true, "student PRN Already Exists"],
	},
	DOB: {
		type: Date,
		required: [true, "dob is required"],

	},
	Branch: {
		type: String,
		required: [true, "branch is required"],

	},
	SSC: {
		type: String,
		required: [true, "ssc is required"],

	},
	SSCBOARD: {
		type: String,
		required: [true, "sscboard is required"],

	},
	HSC: {
		type: String,
		required: [true, "hsc is required"],

	},
	HSCBOARD: {
		type: String,
		required: [true, "hscboard is required"],

	},
	Diploma: {
		type: String,
		required: [true, "diploma is required"],

	},
	DiplomaYear: {
		type: String,
		required: [true, "diplomayear is required"],

	},
	SSCBOARD: {
		type: String,
		required: [true, "sscboard is required"],

	},
	// Cast: {
	// 	type: String,
	// 	required: [true, "cast is required"],

	// },
	City: {
		type: String,
		required: [true, "city is required"],

	},
	SKILLS: {
		type: String,
		required: [true, "skills can't be blank"],
	},
});


module.exports = mongoose.model("Student", studentSchema);

