const mongoose = require('mongoose');
const crypto = require('crypto');

const FacultySchema = mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	fullname:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	hash: String,
	salt: String,
	course: String,
	type: String
});

//method to set salt and hash the password for a user
FacultySchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

//method to check entered password is correct or not
FacultySchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;	
};

const Faculty = module.exports = mongoose.model('Faculty', FacultySchema);