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

exports.register = (req, res, next) => {
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
                                        url: 'http://localhost:3000/user/' + result.id
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


exports.login = (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
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
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
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

            User.updateOne({ _id: id }, {confirm_code: code, confirmed: 0})
            .exec()
            .then(result => {
                sendEmail(email, code);
                res.status(200).json({
                    message: 'Verification code sent to ' + email
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
                error: err
            })
        });
};


// send email with verification code
function sendEmail(email, code) {

    // from details
    const from = 'trainticketsapp@gmail.com';
    const pass = 'trainTicketsApp';

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
        from: '"TrainTickets" <trainticketsapp@gmail.com>',
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