const user = require('../model/userModel');
const bcrypt = require('bcrypt');
const userController = function () {};

userController.signin = function (data) {
    return new Promise(function (resolve, reject) {

        user.findOne({email: data.email})
            .then((user) => {
                if (user) {
                    //compare encrypted passwords
                    if (bcrypt.compareSync(data.password, user.password)) {
                        const payload = {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            telephoneNumber: user.telephoneNumber,
                            role: user.role,
                        };
                            resolve({status: 200, user: payload, message: "Successfully logged in", success: true})
                    } else {
                        resolve({
                            status: 200,
                            user: null,
                            message: "Combination of email address and Password doesn't match",
                            success: false
                        })
                    }
                } else {
                    resolve({
                        status: 200,
                        message: "Combination of Email Address and Password doesn't match",
                        success: false
                    })
                }
            })
            .catch((err) => {
                reject({status: 500, error: "Error: " + err})
            });
    });
};
module.exports = userController;