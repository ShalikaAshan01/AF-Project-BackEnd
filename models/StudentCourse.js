const mongoose = require('mongoose');

const studentCourseSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
    courseName: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now() },
    updated_at: { type: Date, required: true, default: Date.now() }
});


module.exports = mongoose.model('StudentCourse', studentCourseSchema);