const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = require('../../models/userModel')

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
    }
}