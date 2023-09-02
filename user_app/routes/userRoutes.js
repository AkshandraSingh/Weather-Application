const express = require('express')

const user = require('../controller/userController')
const userImageStorage = require('../../middleware/userImageStorage')
const userValidations = require('../../validations/user/userValidator')

const router = express.Router()

router.post('/createUser', userValidations.createUserValidation, user.createUser)
router.post('/loginUser', userValidations.userLoginValidation, user.userLogin)
router.post('/forgetPassword', user.forgetPassword)
router.post('/resetPassword/:userId/:token', userValidations.createUserValidation, user.resetPassword)
router.patch('/setNewPassword/:userId', userValidations.setNewPasswordValidation, user.setNewPassword)
router.post('/changeProfilePic/:userId', userImageStorage.upload.single('userProfilePic'), user.changeProfilePic)

module.exports = router
