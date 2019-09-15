const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibnJhbiIsImEiOiJjazAzcWl0dGYwMmNnM2Ryem1kcmFlcnZ0In0.g2FYiz-d84BwF0cZVd1cxg';

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to location server!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;