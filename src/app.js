const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Kamlesh Bhure'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kamlesh Bhure'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kamlesh Bhure'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is not provided.'
        })
    }

    geocode(req.query.address, (error, {longitude, lattitude, location} = {}) => {
        if (!error) {
            forecast(longitude, lattitude, (error, {weather_desc, temperature, feelslike} = {}) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    address: req.query.address,
                    forecast: weather_desc+". It is "+temperature+" degree out. It feels like "+feelslike+" degree.",
                    location
                })
            })
        } else {
            return res.send({ error })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kamlesh Bhure',
        errorMessage: 'Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kamlesh Bhure',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server has started on port 3000')
})