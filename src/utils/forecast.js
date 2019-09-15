const request = require('request');
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibnJhbiIsImEiOiJjazAzcWl0dGYwMmNnM2Ryem1kcmFlcnZ0In0.g2FYiz-d84BwF0cZVd1cxg';


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/d3ffa69943654ac254c1a5770a124dbc/' + lat + ',' + long + "?units=si";

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to server!', undefined);
        } else if (body.error) {
            callback('Unable to connect your coordinate. Try another coordinate!', undefined);
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                humidity: body.currently.humidity,
                uvIndex: body.currently.uvIndex,
                windSpeed: body.currently.windSpeed,
                icon: body.currently.icon,
                // time: body.currently.time,
                // today: {
                // temperatureHigh: body.daily.data[0].temperatureHigh,
                // temperatureLow: body.daily.data[0].temperatureLow,
                // icon: body.daily.data[0].icon
                // },
                nextDay1: {
                    temperatureHigh: body.daily.data[1].temperatureHigh,
                    temperatureLow: body.daily.data[1].temperatureLow,
                    time: body.daily.data[1].time,
                    icon: body.daily.data[1].icon
                },
                nextDay2: {
                    temperatureHigh: body.daily.data[2].temperatureHigh,
                    temperatureLow: body.daily.data[2].temperatureLow,
                    time: body.daily.data[2].time,
                    icon: body.daily.data[2].icon
                },
                nextDay3: {
                    temperatureHigh: body.daily.data[3].temperatureHigh,
                    temperatureLow: body.daily.data[3].temperatureLow,
                    time: body.daily.data[3].time,
                    icon: body.daily.data[3].icon
                }
            });
        }
    });


}

module.exports = forecast;