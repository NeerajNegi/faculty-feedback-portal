const express = require('express');
const jwt = require('jsonwebtoken');
const adminRouter = express.Router();
var config = require('../config');

//importing Admin schema
const Admin = require('../models/admin');
const validateToken = require('../middleware/validateToken');

//get Admins
adminRouter.get('/admins', (req, res, next) => {
	Admin.find((err, admins)=>{
		res.json(admins);
	});
});

//get Admin by id
adminRouter.get('/admin/:id', (req, res, next) => {
	Admin.find({_id: req.params.id}, function(err, admin){
		if(err) throw (err);

		if(admin){
			console.log(admin);
			res.status(201).send({
				admin: admin,
				message: 'Admin retrived'
			});
		} else {
			console.log('Admin not found');
			res.status(400).send({
				message: 'Admin not found'
			});
		}
	})
});

//add(signup) Admin
adminRouter.post('/admin', (req, res, next) => {
	Admin.find({username: req.body.username}, function(err, admin){
		
		if(err) throw(err);

		if(admin.length > 0){
			console.log(admin);
			console.log("Admin already registered");
			res.status(400).send({
				message: "Admin already exists."
			});
		} else {
			let newAdmin = new Admin();
			newAdmin.username = req.body.username
			newAdmin.fullname = req.body.fullname
			newAdmin.email = req.body.email,
			newAdmin.courses = req.body.courses,
			newAdmin.type ='admin'

			newAdmin.setPassword(req.body.password);

			newAdmin.save((err, admin) => {
				if(err){
					console.log(err);
					return res.status(400).send({
						message: "Failed to add Admin"
					});
				} else {
					return res.status(201).send({
						message: "Admin added successfully"
					});
				}
			});
		}
	});
});

//Login Admin
adminRouter.post('/admin/login', (req, res, next) => {
	Admin.findOne({username: req.body.username}, function(err, admin){
		if(err){
			console.log(err);
			return res.status(400).send({
				message: 'Internal Error Has Occured',
				error: err
			});
			throw(err);
		}
		if(admin === null){
			console.log("No Admin found with username: ", req.body.username);
			return res.status(400).send({
				message: 'No Admin found.'
			});
		} else {
			if(admin.validPassword(req.body.password)){
				const payload = {
			      type: admin.type
			    };
			    var token = jwt.sign(payload, config.secret, { 
			    	expiresIn: '24h' 
			    });
				return res.status(201).send({
					message: "Admin Logged In.",
					admin: admin,
					token: token
				});
			} else {
				return res.status(400).send({
					message: 'Incorrect Password'
				});
			}
		}
	});
});

//delete Admin
adminRouter.delete('/admin/:id', validateToken, (req, res, next) => { 
	Admin.findOne({_id: req.params.id}, (err, admin) => {
		if(err) throw err;
		if(admin === null){
			return res.status(400).send({
				message: 'No such Admin exists'
			});
		} else {
			Admin.remove({_id: req.params.id}, (err, result) => {
				return res.status(201).send({
					message: 'Admin deleted'
				});
			});
		}
	});	
});

module.exports = adminRouter;