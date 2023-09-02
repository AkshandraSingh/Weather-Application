const express = require('express')

const user = require('../controller/userController')
const userImageStorage = require('../../middleware/userImageStorage')

const router = express.Router()

router.post('/createUser', user.createUser)
router.post('/loginUser', user.userLogin)
router.post('/forgetPassword', user.forgetPassword)
router.post('/resetPassword/:userId/:token', user.resetPassword)
router.patch('/setNewPassword/:userId', user.setNewPassword)
router.post('/changeProfilePic/:userId', userImageStorage.upload.single('userProfilePic'), user.changeProfilePic)

module.exports = router
