const request = require('request')

//
// Goal: Add new data to forecast
//
// 1. Update the forecast string to include new data (Humidity)
// 2. Commit your changes
// 3. Push your changes to GirHub and deploy to Heroku
// 4. Test oyur work in the live application!

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=97f033dd166d0855b309f772a13d4c27&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (error, { body } = {} ) => {

    if (error) {
        callback('unable to connecto to weather service!', undefined)
    } else if (body.error) {
        callback(body.error.info)
    } else {
        const current = body.current

        callback(undefined,
            current.weather_descriptions
            + '. It is currently ' + current.temperature
            + ' degrees out. It feels like '
            + current.feelslike
            + ' degrrees out and the humidity is at about '
            + current.humidity + '%'
        )
    }
 })
}

module.exports = forecast