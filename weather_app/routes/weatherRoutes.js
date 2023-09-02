const express = require('express')

const weather = require('../controller/weatherController')

const router = express.Router()

router.get('/weatherInfo/:userId', weather.weatherInfo)
router.post('/addFavoritePlace/:userId', weather.addFavoritePlace)
router.post('/removeFavoritePlace/:userId', weather.removeFavoritePlace)

module.exports = router
