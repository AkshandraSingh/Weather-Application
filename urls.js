const express = require('express')

const weatherRouter = require('./weather_app/routes/weatherRoutes')
const userRouter = require('./user_app/routes/userRoutes')

const router = express.Router()

router.use('/weather', weatherRouter)
router.use('/user', userRouter)

module.exports = router
