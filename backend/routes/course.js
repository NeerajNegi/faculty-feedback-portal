const express = require('express');
const jwt = require('jsonwebtoken');
const courseRouter = express.Router();
var config = require('../config');
var fs = require('fs');
var util = require('util');
const multer = require('multer');

//importing course schema
const Course = require('../models/course');
const validateToken = require('../middleware/validateToken');

var upload = multer({ inMemory: true}).single('csv');

//get courses
courseRouter.get('/courses', (req, res, next) => {
	Course.find((err, courses)=>{
		res.status(201).send({
			courses: courses
		});
	});
});

//get course by id
courseRouter.get('/course/:id', (req, res, next) => {
	Course.find({courseId: req.params.id}, function(err, course){
		if(err) throw (err);

		if(course){
			console.log(course);
			res.status(201).send({
				course: course,
				message: 'course retrived'
			});
		} else {
			console.log('course not found');
			res.status(400).send({
				message: 'course not found'
			});
		}
	})
});

//get mycourse Student
courseRouter.post('/mycourses', validateToken, (req, res, next) => {
	Course.find({students: req.body.id}, function(err, courses){
		if(err) throw (err);

		if(courses.length > 0){
			console.log(courses);
			res.status(201).send({
				success: true,
				course: courses,
				message: 'course retrived'
			});
		} else if( courses.length === 0){
			res.status(201).send({
				sucess: false,
				message: 'Not enrolled in any Course.'
			})
		}
	})
});

//add course
courseRouter.post('/course', validateToken, (req, res, next) => {
	Course.find({courseId: req.body.courseId}, function(err, course){
		
		if(err) throw(err);

		if(course.length > 0){
			console.log(course);
			console.log("course already registered");
			res.status(400).send({
				message: "course already exists."
			});
		} else {
			let newcourse = new Course();
			newcourse.courseName = req.body.courseName
			newcourse.courseId = req.body.courseId
			newcourse.students = req.body.students,
			newcourse.faculty = req.body.faculty

			newcourse.save((err, course) => {
				if(err){
					console.log(err);
					return res.status(400).send({
						message: "Failed to add course"
					});
				} else {
					return res.status(201).send({
						message: "course added successfully"
					});
				}
			});
		}
	});
});

//add course
courseRouter.put('/course/:id', validateToken, (req, res, next) => {
	Course.find({_id: req.params.id}, function(err, course){
		if(err) throw(err);

		if(course.length > 0){
			console.log(course);
			console.log(typeof course);
			console.log(course.length);
			//console.log(course.students);
			//course.students.push(req.body.studentId);

			/*course.save( (err, res) => {
				if(err) throw err;
				res.status(400).send({
					message: "course updated"
				});
			});
			*/
		} else {
			res.status(400).send({
				message: "No such course exists."
			});
		}
	});
});

//delete course
courseRouter.delete('/course/:id', validateToken, (req, res, next) => { 
	Course.findOne({_id: req.params.id}, (err, course) => {
		if(err) throw err;
		if(course === null){
			return res.status(400).send({
				message: 'No such course exists'
			});
		} else {
			course.remove({_id: req.params.id}, (err, result) => {
				return res.status(201).send({
					message: 'course deleted'
				});
			});
		}
	});	
});

//csv upload
courseRouter.post("/course/upload", function(req, res, next){
  console.log(req.files);
  /*
  var tmp_path = req.file.path;
  var target_path = './uploads/' + req.file.originalname;

  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { res.render('complete'); });
  src.on('error', function(err) { res.render('error'); });
  */
});

module.exports = courseRouter;