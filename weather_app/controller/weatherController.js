const axios = require('axios');

const mailService = require('../../services/emailService');
const userSchema = require('../../models/userModel')
const weatherLogger = require('../../utils/weatherLoggers/weatherLogger')

module.exports = {
    weatherInfo: async (req, res) => {
        try {
            const { userId } = req.params;
            const userData = await userSchema.findById(userId);
            const userCity = userData.userCity;
            const apiKey = process.env.WEATHER_KEY;
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${userCity}`;
            axios.get(apiUrl)
                .then(async (response) => {
                    const weatherData = response.data;
                    const mailOptions = {
                        from: process.env.USER_EMAIL,
                        to: process.env.USER_EMAIL,
                        subject: 'Today Weather Data',
                        text: `
                        Weather in ${weatherData.location.name},${weatherData.location.country}:
                        Temperature: ${weatherData.current.temp_c}
                        Weather: ${weatherData.current.condition.text}`,
                    };
                    await mailService.transporter.sendMail(mailOptions);
                    weatherLogger.log('info', 'Mail has been sent')
                    res.status(200).send({
                        success: true,
                        message: "Mail has been sent",
                        weatherIn: weatherData.location.name,
                        temperature: weatherData.current.temp_c,
                        weather: weatherData.current.condition.text
                    });
                })
                .catch((error) => {
                    weatherLogger.log('error', `Error: ${error.message}`)
                    res.status(500).send({
                        success: false,
                        message: "Error!",
                        error: error.message
                    });
                });
        } catch (error) {
            weatherLogger.log('error', `Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            });
        }
    },

    addFavoritePlace: async (req, res) => {
        try {
            const { userId } = req.params
            const place = req.body.place
            const userData = await userSchema.findById(userId)
            userData.favoritePlaces.push(place)
            await userData.save()
            weatherLogger.log('info', 'Place is added to favorite')
            res.status(200).send({
                success: true,
                message: `${place} is added to favorite`
            })
        } catch (error) {
            weatherLogger.log('error', `Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            });
        }
    },

    removeFavoritePlace: async (req, res) => {
        try {
            const { userId } = req.params;
            const place = req.body.place
            const userData = await userSchema.findById(userId);
            const placeIndex = userData.favoritePlaces.indexOf(place);
            if (placeIndex === -1) {
                weatherLogger.log('error', "Place is not in the user's favorite places")
                return res.status(400).send({
                    success: false,
                    message: `${place} is not in the user's favorite places`,
                });
            }
            userData.favoritePlaces.splice(placeIndex, 1);
            await userData.save();
            weatherLogger.log('info', 'Place has been removed from favorites')
            res.status(200).send({
                success: true,
                message: `${place} has been removed from favorites`,
            });
        } catch (error) {
            weatherLogger.log('error', `Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    },

    listFavoritePlaces: async (req, res) => {
        try {
            const { userId } = req.params;
            const userData = await userSchema.findById(userId);
            const favoritePlaces = userData.favoritePlaces;
            weatherLogger.log('info', "Your all favorite places")
            res.status(200).send({
                success: true,
                message: "Your all favorite places",
                data: favoritePlaces
            });
        } catch (error) {
            weatherLogger.log('error', `Error: ${error.message}`);
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    },

    favoritePlacesWeather: async (req, res) => {
        try {
            const { userId } = req.params;
            const userData = await userSchema.findById(userId);
            const favoritePlaces = userData.favoritePlaces;
            const apiKey = process.env.WEATHER_KEY;
            const weatherResults = [];
            for (const userCity of favoritePlaces) {
                const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${userCity}`;
                const response = await axios.get(apiUrl);
                const weatherData = response.data;
                weatherResults.push({
                    location: weatherData.location.name,
                    temperature: weatherData.current.temp_c,
                    weather: weatherData.current.condition.text,
                });
            }
            weatherLogger.log('info', 'Weather data fetched successfully')
            res.status(200).send({
                success: true,
                message: "Weather data fetched successfully",
                weatherData: weatherResults,
            });
        } catch (error) {
            weatherLogger.log('error', `Error: ${error.message}`);
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    },

    searchWeather: async (req, res) => {
        try {
            const { city } = req.query
            const apiKey = process.env.WEATHER_KEY;
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
            axios.get(apiUrl)
                .then(async (response) => {
                    const weatherData = response.data;
                    weatherLogger.log('info', `Weather data found`)
                    res.status(200).send({
                        success: true,
                        message: `Weather data found of ${city}`,
                        weatherIn: weatherData.location.name,
                        temperature: weatherData.current.temp_c,
                        weather: weatherData.current.condition.text
                    });
                })
                .catch((error) => {
                    weatherLogger.log('error', `Error: ${error.message}`)
                    res.status(500).send({
                        success: false,
                        message: "Error!",
                        error: error.message
                    });
                });
        } catch (error) {
            weatherLogger.log('error', `Error: ${error.message}`);
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    }
};
