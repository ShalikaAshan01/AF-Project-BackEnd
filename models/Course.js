var mongoose = require('mongoose');
// Setup schema with variables
var courseSchema = mongoose.Schema({
    course_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    enroll_key: {
        type: String,
        required: true
    },
    credits: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    instructor_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    time_stamp: {
        type: String,
        required: true
    }
});
// Export Course model
var Course = module.exports = mongoose.model('course', courseSchema);
module.exports.get = function (callback, limit) {
    Course.find(callback).limit(limit);
}

