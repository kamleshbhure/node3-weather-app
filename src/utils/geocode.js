const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoia2FtbGVzaGJodXJlIiwiYSI6ImNrdXBmN2JiaDBkM3Myb3A1NWk3azYzcWoifQ.sM_sTcgQEp414coUPRbqmQ&limit=1"
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect with location service", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location", undefined)
        } else {
            const data = {
                longitude: body.features[0].center[0],
                lattitude: body.features[0].center[1],
                location: body.features[0].place_name,
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode