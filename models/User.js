const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    fullname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    faculty: { type: String, required: true },
    status: { type: String, required: true, default: 'ACTIVE' },
    //confirmed: { type: Number, required: true, default: 0 },
    //confirm_code: { type: String, required: true, default: '1234' },
    created_by: { type: mongoose.Schema.Types.ObjectId, required: true },
    created_at: { type: Date, required: true, default: Date.now() },
    updated_at: { type: Date, required: true, default: Date.now() }
});

/**
 * Todo:
 * Add user confirmation
 */

module.exports = mongoose.model('User', userSchema);