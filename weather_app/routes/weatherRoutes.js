const express = require('express')

const weather = require('../controller/weatherController')
const { userAuthentication } = require('../../middleware/authToken')

const router = express.Router()

router.get('/weatherInfo/:userId', userAuthentication, weather.weatherInfo)
router.post('/addFavoritePlace/:userId', userAuthentication, weather.addFavoritePlace)
router.post('/removeFavoritePlace/:userId', userAuthentication, weather.removeFavoritePlace)
router.get('/listFavoritePlaces/:userId', userAuthentication, weather.listFavoritePlaces)
router.get('/favoritePlacesWeather/:userId', userAuthentication, weather.favoritePlacesWeather)
router.get('/searchWeather', userAuthentication, weather.searchWeather)

module.exports = router
