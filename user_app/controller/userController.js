const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = require('../../models/userModel')
const mailService = require('../../services/emailService');

module.exports = {
    createUser: async (req, res) => {
        try {
            const userData = new userSchema(req.body);
            const salt = await bcrypt.genSalt(10);
            const isUserExist = await userSchema.findOne({
                userEmail: req.body.userEmail
            });
            if (isUserExist) {
                return res.status(401).send({
                    success: false,
                    message: "User already exists with this email"
                });
            }
            userData.userProfilePic = (userData.userGender === 'male') ?
                'C:/Users/Administrator/Desktop/WeatherApp/uploads/avatars/maleAvatar.jpg' :
                'C:/Users/Administrator/Desktop/WeatherApp/uploads/avatars/femaleAvatar.png';
            userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
            userData.usedPasswords.push(userData.userPassword);
            userData.favoritePlaces.push(userData.userCity);
            let Data = await userData.save();
            res.status(201).send({
                success: true,
                message: "User created successfully",
                Data: Data
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            });
        }
    },

    userLogin: async (req, res) => {
        try {
            const { userPassword, userEmail } = req.body
            const isUserExist = await userSchema.findOne({
                userEmail: userEmail
            });
            if (isUserExist) {
                const hashPassword = await bcrypt.compare(req.body.userPassword, isUserExist.userPassword)
                console.log(hashPassword)
                if (hashPassword) {
                    const token = jwt.sign({ isUserExist }, process.env.SECRET_KEY, {
                        expiresIn: "1h",
                    })
                    return res.status(200).send({
                        success: true,
                        message: 'Login Successful ✔',
                        token: token
                    })
                }
                res.status(401).send({
                    success: false,
                    message: "Email or Password is not correct"
                })
            }
            res.status(404).send({
                success: false,
                message: "Email not found!"
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            });
        }
    },

    forgetPassword: async (req, res) => {
        try {
            const { userEmail } = req.body;
            const isUserExist = await userSchema.findOne({
                userEmail: userEmail
            });

            if (!isUserExist) {
                return res.status(404).json({
                    success: false,
                    message: "Email not found"
                });
            }

            const userData = await userSchema.findById(isUserExist._id);

            const secret = userData._id + process.env.SECRET_KEY;
            const token = jwt.sign({ userID: userData._id }, secret, { expiresIn: "1h" }); // Adjust the expiration time as needed

            const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;

            let info = await mailService.transporter.sendMail({
                from: process.env.USER_EMAIL,
                to: userEmail,
                subject: "Reset Password Mail",
                html: `<a href=${link}>Click on this link to reset your password</a>` // Close the <a> tag
            });

            return res.status(200).json({
                success: true,
                message: "We just sent you an email",
                token: token,
                userID: userData._id
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error",
                error: error.message
            });
        }
    },

    resetPassword: async (req, res) => {
        let isPasswordExist = false;
        try {
            const salt = await bcrypt.genSalt(10);
            const { newPassword, confirmPassword } = req.body;
            const { userId, token } = req.params;
            const userData = await userSchema.findById(userId);
            // ? Verify the token
            try {
                jwt.verify(token, process.env.SECRET_KEY);
            } catch (tokenError) {
                return res.status(401).json({
                    success: false,
                    message: "Token is incorrect or expired",
                });
            }
            if (newPassword === confirmPassword) {
                for (const oldHashedPassword of userData.usedPasswords) {
                    if (await bcrypt.compare(newPassword, oldHashedPassword)) {
                        isPasswordExist = true;
                        break;
                    }
                }
                if (isPasswordExist) {
                    return res.status(401).json({
                        success: false,
                        message: "Don't use old passwords, try another password",
                    });
                }
                const bcryptPassword = await bcrypt.hash(newPassword, salt);
                userData.userPassword = bcryptPassword;
                userData.usedPasswords.push(bcryptPassword);
                await userData.save();
                res.status(201).json({
                    success: true,
                    message: "Password Updated",
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "New password and confirm password do not match",
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error",
                error: error.message,
            });
        }
    },


    setNewPassword: async (req, res) => {
        try {
            let isPasswordExist = false;
            const { userId } = req.params;
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const userData = await userSchema.findById(userId);
            const checkPassword = await bcrypt.compare(oldPassword, userData.userPassword);
            if (checkPassword) {
                if (confirmPassword === newPassword) {
                    for (const usedPassword of userData.usedPasswords) {
                        if (await bcrypt.compare(newPassword, usedPassword)) {
                            isPasswordExist = true;
                            break;
                        }
                    }
                    if (isPasswordExist) {
                        return res.status(401).json({
                            success: false,
                            message: "This password you already used in the past",
                        });
                    } else {
                        const salt = await bcrypt.genSalt(10);
                        const bcryptPassword = await bcrypt.hash(newPassword, salt);
                        userData.userPassword = bcryptPassword;
                        userData.usedPasswords.push(bcryptPassword);
                        await userData.save();
                        res.status(200).json({
                            success: true,
                            message: "Your Password is updated!",
                        });
                    }
                } else {
                    res.status(401).json({
                        success: false,
                        message: "New password and Confirm password do not match",
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: "Old password is incorrect",
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error",
                error: error.message,
            });
        }
    },

    changeProfilePic: async (req, res) => {
        try {
            const { userId } = req.params
            const userData = await userSchema.findById(userId)
            const filePath = `/uploads/userProfilePics/${req.file.filename}`;
            userData.userProfilePic = filePath;
            await userData.save()
            res.status(200).send({
                success: true,
                message: "Profile Pic updated!",
                userData: userData
            })
        } catch (error) {
            req.file ? unlinkSync(req.file.path) : nul
            userLogger.log('error', `Error: ${error.message}`)
            res.status(500).json({
                success: false,
                message: "Error",
                error: error.message,
            });
        }
    },
}
