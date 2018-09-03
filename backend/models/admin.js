const mongoose = require('mongoose');
var crypto = require('crypto');

const AdminSchema = mongoose.Schema({
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
	collegeName: String,
	collegeId: String,
	type: String
});

//method to set salt and hash the password for a user
AdminSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

//method to check entered password is correct or not
AdminSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;	
};

const Admin = module.exports = mongoose.model('Admin', AdminSchema);