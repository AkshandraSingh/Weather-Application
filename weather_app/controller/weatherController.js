const axios = require('axios');

const mailService = require('../../services/emailService');
const userSchema = require('../../models/userModel')

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
                    res.status(200).send({
                        success: true,
                        message: "Mail has been sent",
                        weatherIn: weatherData.location.name,
                        temperature: weatherData.current.temp_c,
                        weather: weatherData.current.condition.text
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            });
        }
    }
};
