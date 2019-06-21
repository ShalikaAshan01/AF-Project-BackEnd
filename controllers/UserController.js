/**
 * UserController
 * All user functions are defined here
 * Functions are called in '../routes/'
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

const User = require('../models/User');

exports.index = (req, res) => {
    User.find()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All users',
                success: true,
                users: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.findInstructorByFaculty = (req, res) => {
    const faculty = req.params.faculty;

    User.find({ faculty: faculty, type: { $gte: 'INSTRUCTOR' } })
        .exec()
        .then(result => {
            if (result.length > 0) {
                return res.status(200).json({
                    count: result.length,
                    message: 'Instructors found',
                    success: true,
                    users: result
                });
            }
            else {
                return res.status(404).json({
                    count: result.length,
                    message: 'No Instructors',
                    success: false
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}

exports.register = (req, res) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email exists!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            fullname: req.body.fullname,
                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            type: req.body.type,
                            phone: req.body.phone,
                            gender: req.body.gender,
                            faculty: req.body.faculty,
                            created_by: req.body.created_by
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created',
                                    user: {
                                        _id: new mongoose.Types.ObjectId(),
                                        fullname: result.fullname,
                                        email: result.email,
                                        username: result.username,
                                        password: hash, // to be removed after testing!!!
                                        type: result.type,
                                        phone: result.phone,
                                        gender: result.gender,
                                        faculty: result.faculty,
                                        status: result.status,
                                        created_by: result.created_by,
                                        confirmed: result.confirmed,
                                        created_at: result.created_at,
                                        updated_at: result.updated_at
                                    },
                                    reqeuest: {
                                        type: 'GET',
                                        url: 'http://localhost:4200/user/' + result.id
                                    }
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};


exports.getUserById = (req, res) => {
    User.find({ _id: req.params.userId })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'User not found',
                    success: false
                });
            } else {
                return res.status(200).json({
                    message: 'User found.',
                    user: user[0],
                    success: true
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};


exports.getUserByUsername = (req, res) => {
    User.find({ username: req.params.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'User not found',
                    success: false
                });
            } else {
                return res.status(200).json({
                    message: 'User found.',
                    user: user[0],
                    success: true
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};


exports.login = (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed',
                    success: false
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed',
                        success: false
                    });
                }
                if (result) {
                    if (user[0].confirmed == 0) {
                        return res.status(401).json({
                            message: 'Please verify your email',
                            success: false
                        });
                    }
                    const token = jwt.sign(
                        {
                            username: user[0].username,
                            userId: user[0]._id,
                            role: user[0].role,
                        },
                        'process.env.JWT_KEY', // secret fot jwt - add this in env
                        {
                            expiresIn: '1h'
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful.',
                        user: user[0],
                        token: token,
                        success: true
                    });
                }
                res.status(401).json({
                    message: 'Auth failed',
                    success: false
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.sendVerifyMail = (req, res) => {
    const id = req.params.userId;
    User.find({ _id: id })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            const email = user[0].email;
            const code = makeCode(8);

            User.updateOne({ _id: id }, { confirm_code: code, confirmed: 0 })
                .exec()
                .then(result => {
                    sendEmail(email, code);
                    res.status(200).json({
                        message: 'Verification code sent to ' + email,
                        success: true
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                success: false
            })
        });
};


exports.verifyCode = (req, res) => {
    const confirm_code = req.body.confirm_code;
    const id = req.params.userId;
    User.find({ _id: id })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            const code = user[0].confirm_code;
            if (confirm_code === code) {
                User.updateOne({ _id: id }, { confirm_code: '', confirmed: 1 })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Email verified. Please login.',
                            success: true
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
            } else {
                res.status(401).json({
                    message: 'Verification failed',
                    success: false
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};


// send email with verification code
function sendEmail(email, code) {

    // from details
    const from = 'adm1n157a70r@gmail.com';
    const pass = '5hNuMvydHb3WpjD';

    // mail settings
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: from,
            pass: pass
        }
    });

    // mail template to be sent
    let mailOptions = {
        from: '"LMS ADMIN" <adm1n157a70r@gmail.com>',
        to: email,
        subject: "Please verify your Email address.",
        text: "Enter the code\n" + code
    };

    // sending mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

};


function makeCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}