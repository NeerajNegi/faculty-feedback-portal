const express = require('express');
const facultyRouter = express.Router();
const jwt = require('jsonwebtoken');
var config = require('../config');

//importing Faculty schema
const Faculty = require('../models/faculty');
const validateToken = require('../middleware/validateToken');

//get Faculty
facultyRouter.get('/facultys', (req, res, next) => {
	Faculty.find((err, facultys) => {
		res.status(201).send({
			facultys: facultys
		});
	});
});

//get Faculty by id
facultyRouter.get('/faculty/:id', (req, res, next) => {
	Faculty.find({_id: req.params.id}, function(err, faculty){
		if(err) throw (err);

		if(faculty){
			console.log(faculty);
			res.status(201).send({
				Faculty: faculty,
				message: 'Faculty retrived'
			});
		} else {
			console.log('Faculty not found');
			res.status(400).send({
				message: 'Faculty not found'
			});
		}
	})
});

//add(signup) Faculty
facultyRouter.post('/faculty', (req, res, next) => {
	Faculty.find({username: req.body.username}, function(err, faculty){
		
		if(err) throw(err);

		if(faculty.length > 0){
			console.log(faculty);
			console.log("Faculty already registered");
			res.status(400).send({
				message: "Faculty already exists."
			});
		} else {
			let newFaculty = new Faculty();
			newFaculty.username = req.body.username
			newFaculty.fullname = req.body.fullname
			newFaculty.email = req.body.email,
			newFaculty.course = req.body.course,
			newFaculty.type ='faculty'

			newFaculty.setPassword(req.body.password);

			newFaculty.save((err, faculty) => {
				if(err){
					console.log(err);
					return res.status(400).send({
						message: "Failed to add Faculty"
					});
				} else {
					return res.status(201).send({
						message: "Faculty added successfully"
					});
				}
			});
		}
	});
});

//Login Faculty
facultyRouter.post('/faculty/login', (req, res, next) => {
	Faculty.findOne({username: req.body.username}, function(err, faculty){
		if(err){
			console.log(err);
			return res.status(400).send({
				message: 'Internal Error Has Occured',
				error: err
			});
			throw(err);
		}
		if(faculty === null){
			console.log("No Faculty found with username: ", req.body.username);
			return res.status(400).send({
				message: 'No Faculty found.'
			});
		} else {
			if(faculty.validPassword(req.body.password)){
				const payload = {
			      type: faculty.type
			    };
			    var token = jwt.sign(payload, config.secret, {
					expiresIn: '24h'
				});
				return res.status(201).send({
					message: "Faculty Logged In.",
					faculty: faculty,
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

//delete Faculty
facultyRouter.delete('/faculty/:id', (req, res, next) => { 
	Faculty.findOne({_id: req.params.id}, (err, faculty) => {
		if(err) throw err;
		if(faculty === null){
			return res.status(400).send({
				message: 'No such Faculty exists'
			});
		} else {
			Faculty.remove({_id: req.params.id}, (err, result) => {
				return res.status(201).send({
					message: 'Faculty deleted'
				});
			});
		}
	});	
});

module.exports = facultyRouter;