const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
	courseName: String,
	courseId: String,
	students: [String],
	faculty: String
});

const Course = module.exports = mongoose.model('Course', CourseSchema);