const express = require('express')

const user = require('../controller/userController')

const router = express.Router()

router.post('/createUser', user.createUser)
router.post('/loginUser', user.userLogin)
router.post('/forgetPassword', user.forgetPassword)

module.exports = router
