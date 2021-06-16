const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=97f033dd166d0855b309f772a13d4c27&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (error, { body } = {} ) => {

    if (error) {
        callback('unable to connecto to weather service!', undefined)
    } else if (body.error) {
        callback(body.error.info)
    } else {
        const current = body.current
        callback(undefined, current.weather_descriptions + '. It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrrees out.')
    }
 })
}

module.exports = forecast