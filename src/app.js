const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fetch = require('node-fetch');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');



const app = express();
const port = 3000;

//define paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup express
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'The Sun - Home'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        //nếu u không cung cấp address thì default = ho chi minh
        req.query.address = 'ha noi';
    }
    geocode(req.query.address, (err, { latitude, longtitude, location } = {}) => {
        if (err) {
            return res.send({ err });
        }

        forecast(latitude, longtitude, (err, dataForecast) => {
            if (err) {
                return res.send({ err });
            }
            res.send({
                temperature: dataForecast.temperature,
                humidity: dataForecast.humidity,
                uvIndex: dataForecast.uvIndex,
                windSpeed: dataForecast.windSpeed,
                location: location,
                icon: dataForecast.icon,
                // time: dataForecast.time,
                // today: dataForecast.today,
                nextDay1: dataForecast.nextDay1,
                nextDay2: dataForecast.nextDay2,
                nextDay3: dataForecast.nextDay3
            })
        })
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'The Sun - About'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'The Sun - Help'
    });
})


app.listen(port, () => {
    console.log('Server is up to ' + port);
})