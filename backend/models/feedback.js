const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
	studentId: String,
	studentName: String,
	courseId: String,
	feedback: String,
	showStudentName: Boolean
});

const Feedback = module.exports = mongoose.model('Feedback', FeedbackSchema);