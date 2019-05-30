/**
 * UserController
 * All user functions are defined here
 * Functions are called in '../routes/'
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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