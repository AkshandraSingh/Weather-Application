const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/weatherApp', {
    useNewUrlParser: true,
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})
mongoose.connection.on('error', (error) => {
    console.log('Mongoose error!')
    console.log(`Error: ${error}`)
})
