var mongoose = require('mongoose');
// Setup schema with variables
var assignmentSchema = mongoose.Schema({
    assgnmentName: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    doc: {
        type: String,
        required: true
    },
    instructorId: {
        type: String,
        required: true
    },
    deadLine: {
        type: String,
        required: true
    },
    time_stamp: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
// Export Course model
module.exports = mongoose.model('assignments', assignmentSchema);


