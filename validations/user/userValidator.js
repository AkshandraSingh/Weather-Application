const userValidationSchema = require('./userValidationSchema')

module.exports = {
    createUserValidation: async (req, res, next) => {
        const value = await userValidationSchema.createUser.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    userLoginValidation: async (req, res, next) => {
        const value = await userValidationSchema.userLogin.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    resetPasswordValidation: async (req, res, next) => {
        const value = await userValidationSchema.resetPassword.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    setNewPasswordValidation: async (req, res, next) => {
        const value = await userValidationSchema.setNewPassword.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
