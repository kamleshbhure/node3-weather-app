const request = require('request')

const forecast = (longitude, lattitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2f10afcf752f46d50dc0fbad707bbf70&query="+lattitude+','+longitude
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect with forcast service", undefined)
        } else if (body.error) {
            callback("Unable to find forcast", undefined)
        } else {
            const data = {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_desc: body.current.weather_descriptions[0],
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast