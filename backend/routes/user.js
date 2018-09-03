const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
var config = require('../config');

//importing User schema
const User = require('../models/user');
const validateToken = require('../middleware/validateToken');

//get users
userRouter.get('/users', (req, res, next) => {
	User.find((err, users)=>{
		res.status(201).send({
			users: users
		});
	});
});

//get user by id
userRouter.get('/user/:id', (req, res, next) => {
	User.find({_id: req.params.id}, function(err, user){
		if(err) throw (err);

		if(user){
			console.log(user);
			res.status(201).send({
				user: user,
				message: 'User retrived'
			});
		} else {
			console.log('User not found');
			res.status(400).send({
				message: 'User not found'
			});
		}
	})
});

//add(signup) user
userRouter.post('/user', (req, res, next) => {
	User.find({username: req.body.username}, function(err, user){
		
		if(err) throw(err);

		if(user.length > 0){
			console.log(user);
			console.log("user already registered");
			res.status(400).send({
				message: "user already exists."
			});
		} else {
			let newUser = new User();
			newUser.username = req.body.username
			newUser.fullname = req.body.fullname
			newUser.email = req.body.email,
			newUser.courses = req.body.courses,
			newUser.type ='user'

			newUser.setPassword(req.body.password);

			newUser.save((err, User) => {
				if(err){
					console.log(err);
					return res.status(400).send({
						message: "Failed to add user"
					});
				} else {
					return res.status(201).send({
						message: "User added successfully"
					});
				}
			});
		}
	});
});

//Login user
userRouter.post('/user/login', (req, res, next) => {
	User.findOne({username: req.body.username}, function(err, user){
		if(err){
			console.log(err);
			return res.status(400).send({
				message: 'Internal Error Has Occured',
				error: err
			});
			throw(err);
		}
		if(user === null){
			console.log("No user found with username: ", req.body.username);
			return res.status(400).send({
				message: 'No user found.'
			});
		} else {
			if(user.validPassword(req.body.password)){
				const payload = {
			      type: user.type
			    };
			    var token = jwt.sign(payload, config.secret, {
					expiresIn: '24h'
				});
				return res.status(201).send({
					user: user,
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

//delete User
userRouter.delete('/user/:id', validateToken, (req, res, next) => { 
	User.findOne({_id: req.params.id}, (err, user) => {
		if(err) throw err;
		if(user === null){
			return res.status(400).send({
				message: 'No such user exists'
			});
		} else {
			User.remove({_id: req.params.id}, (err, result) => {
				return res.status(201).send({
					message: 'User deleted'
				});
			});
		}
	});	
});

module.exports = userRouter;