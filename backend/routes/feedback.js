const express = require('express');
const jwt = require('jsonwebtoken');
const feedbackRouter = express.Router();
var config = require('../config');

//importing Admin schema
const Feedback = require('../models/feedback');
const validateToken = require('../middleware/validateToken');

//get Feedbacks
feedbackRouter.get('/feedbacks', (req, res, next) => {
	Feedback.find((err, feedbacks)=>{
		res.status(201).send({
			feedbacks: feedbacks
		});
	});
});

//get myfeedbacks student
feedbackRouter.get('/myfeedbacks/:id', validateToken, (req, res, next) => {
	Feedback.find({studentId: req.params.id}, (err, feedbacks)=>{
		if(err) throw err;
		res.status(201).send({
			feedbacks: feedbacks
		});
	});
});

//get myfeedbacks faculty
feedbackRouter.get('/facultyfeedbacks/:id', (req, res, next) => {
	Feedback.find({courseId: req.params.id}, (err, feedbacks)=>{
		if(err) throw err;
		if(feedbacks.length > 0){
			res.status(201).send({
				success: true,
				feedbacks: feedbacks
			});
		} else {
			res.status(201).send({
				success: false,
				message: "No feedback Yet"
			});
		}
	});
});

//get feedback by id
feedbackRouter.get('/feedback/:id', (req, res, next) => {
	Feedback.find({_id: req.params.id}, function(err, feedback){
		if(err) throw (err);

		if(feedback){
			console.log(feedback);
			res.status(201).send({
				feedback: feedback,
				message: 'Feedback retrived'
			});
		} else {
			console.log('Feedback not found');
			res.status(400).send({
				message: 'Feedback not found'
			});
		}
	})
});


//post feedback
feedbackRouter.post('/feedback', validateToken, (req, res, next) =>{
	Feedback.find({ $and: [ { studentId: req.body.studentId }, { courseId: req.body.courseId  } ] }, function(err, feedback){
		if(err) throw err;
		if(feedback.length > 0){
			console.log(feedback);
			return res.status(400).send({
				message: 'Same Feedback already exists'
			});
		} else {
			let newFeedback = new Feedback();
			newFeedback.studentId = req.body.studentId,
			newFeedback.courseId = req.body.courseId,
			newFeedback.studentName = req.body.studentName,
			newFeedback.feedback = req.body.feedback,
			newFeedback.showStudentName = req.body.showStudentName,

			newFeedback.save((err, User) => {
				if(err){
					console.log(err);
					return res.status(400).send({
						message: "Failed to add feedback"
					});
				} else {
					return res.status(201).send({
						message: "Feedback added successfully"
					});
				}
			});
		}
	})
})

//delete Feedback
feedbackRouter.delete('/feedback/:id', validateToken, (req, res, next) => { 
	Feedback.findOne({_id: req.params.id}, (err, feedback) => {
		if(err) throw err;
		if(feedback === null){
			return res.status(400).send({
				message: 'No such Feedback exists'
			});
		} else {
			Feedback.remove({_id: req.params.id}, (err, result) => {
				return res.status(201).send({
					message: 'Feedback deleted'
				});
			});
		}
	});	
});
module.exports = feedbackRouter;