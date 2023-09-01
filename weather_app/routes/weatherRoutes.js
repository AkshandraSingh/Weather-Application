const express = require('express')

const weather = require('../controller/weatherController')

const router = express.Router()

router.get('/weatherInfo/:userId', weather.weatherInfo)

module.exports = router
