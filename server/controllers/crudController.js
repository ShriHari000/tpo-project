const Student = require("../models/crudModel");
const Compony = require("../models/adminmodel");
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const User = require("../models/user");

// Display All CRUD Data
const crud_index = (req, res) => {
	Student.find(function (err, cruds) {
		res.json(cruds);
	});
};


const crud_get_admin = (req, res) => {
	
	Compony.find(function (err, cruds) {
		res.json(cruds);
	});
};

// Create New CRUD
const crud_create_post = (req, res) => {
	let crud = new Student(req.body);
	console.log(crud)
	crud
		.save()
		.then((crud) => {
			console.log("sucesss")
			res.send(crud);
		})
		.catch(function (err) {
			console.log('Error',err)
			res.status(422).send("Student add failed");
		});
};

// Create new admin post
const crud_create_admin = (req, res) => {
	let crud = new Compony(req.body);
	console.log(crud)
	crud
		.save()
		.then((crud) => {
			console.log("sucesss")
			res.send(crud);
		})
		.catch(function (err) {
			console.log('Error',err)
			res.status(422).send("Crud add failed");
		});
};

// Show a particular CRUD Detail by Id
const crud_details = (req, res) => {
	Student.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("No result found");
		} else {
			res.json(crud);
		}
	});
};

const get_std_email=(req,res)=>{
	console.log('body',req.query)
	Student.find({email:req.query.email}, function (err, crud) {
        if (!crud) {
			console.log("not found")
            res.status(404).send("No result found");
        } else {
            res.json(crud);
        }
    });
}

//update student state to registered or not
const update_std_state = (req, res) => {
	// Check if the request body contains the required 'id' property
	console.log("id",req.body.id)
	if (!req.body.id) {
	  return res.status(400).send('User ID is required');
	}
  
	User.findByIdAndUpdate(req.body.id, { isRegistered: true }, { new: true })
	  .then((updatedUser) => {
		if (!updatedUser) {
		  // Handle the case where the user is not found
		  return res.status(404).send('User not found');
		}
  
		console.log('Success');
		console.log('updated', updatedUser);
		res.json(updatedUser); // Return the updated user object
	  })
	  .catch((err) => {
		console.error('User update failed:', err);
		res.status(500).send('User update failed');
	  });
  };

// Update CRUD Detail by Id
const crud_update = (req, res) => {
	console.log("inside ")
	console.log(req.body)
	Student.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Add { new: true } here
		.then(function (updatedStudent) { // Capture the updated student
			console.log('Success')
			res.json(updatedStudent); // Return the updated student object
		})
		.catch(function (err) {
			res.status(422).send("Student update failed.");
		});
};

// Show a particular admin Detail by Id
const crud_admin_details = (req, res) => {
	Compony.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("No result found");
		} else {
			res.json(crud);
		}
	});
};

// Delete Student Detail by Id
const crud_delete = (req, res) => {
	Student.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("Student not found");
		} else {
			Student.findByIdAndRemove(req.params.id)
				.then(function () {
					res.status(200).json("Student deleted");
				})
				.catch(function (err) {
					res.status(400).send("Student delete failed.");
				});
		}
	});
};

const crud_filter = (req, res) => {
    const cgpa = req.params.CGPA; // Parse CGPA to float
    console.log(cgpa);
    try {
        Student.find({ CGPA: { $gt: cgpa } }, (err, filteredStudents) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (filteredStudents.length === 0) {
				console.log("No student")
                return res.status(404).json({ error: "No students found with CGPA greater than provided value" });
            }
			console.log(filteredStudents);
            res.json(filteredStudents);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};


let transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false, // true for 465, false for other ports
	auth: {
	  user: process.env.SMTP_MAIL, // generated ethereal user
	  pass: process.env.SMTP_PASSWORD, // generated ethereal password
	},
  });
  
  const sendEmail = expressAsyncHandler(async (req, res) => 
  {
	const { dataSend} = req.body;
	const emails= dataSend.emails
	const subject= dataSend.subject

	console.log(emails, subject);

	
  
	var mailOptions = {
	  from: process.env.SMTP_MAIL,
	  subject: subject,
	  text: "you are elligible for E2open",
	};
  
	emails.forEach(( email ) => {
		// Update the 'to' field of mailOptions with the current email address
		console.log("email ise",email)
		mailOptions.to = email;
	  
		// Send email
		transporter.sendMail(mailOptions, function(error, info) {
		  if (error) {
			console.log(`Error sending email to ${email}:`, error);
		  } else {
			console.log(`Email sent successfully to ${email}!`);
		  }
		});
	  });
  });
  


module.exports = {
	crud_index,
	crud_get_admin,
	get_std_email,
	crud_details,
	crud_create_post,
	crud_update,
	update_std_state,
	crud_delete,
	crud_create_admin,
	crud_filter,
	sendEmail,
	crud_admin_details
};
