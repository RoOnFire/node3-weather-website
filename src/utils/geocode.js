const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9yb29uZmlyZSIsImEiOiJja29pb2VpNWUwNmIzMnBwdnZxNzY0YnF0In0.c6Qf9eJDLXzhRNNQdE_p1Q&limit=1'

    request({ url, json: true }, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to connect to location sevice!', undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else if (0 === body.features.length) {
            callback('No location found for the search term', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode