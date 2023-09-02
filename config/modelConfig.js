const mongoose = require('mongoose');

const logger = require('../utils/logger')

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
    logger.log('info', "Mongoose is connected")
})
mongoose.connection.on('error', (error) => {
    console.log('Mongoose error!')
    console.log(`Error: ${error}`)
    logger.log('error', "Mongoose error!")
    logger.log('error', `Error: ${error}`)
})
