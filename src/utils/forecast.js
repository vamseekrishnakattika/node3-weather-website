const request = require('request')
const forecastAPIkey = '95a0deee6cf97070fce0d51399a2609a'

const forecast = (latitude,longitude,callback) => {
  const url = 'https://api.darksky.net/forecast/'+ forecastAPIkey +'/'+ latitude +','+ longitude
  request({
    url,
    json:true
  },(error,response, body) =>{
    if (!error && response.statusCode === 200){
      callback(undefined,
        body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + 
        ' with a low of ' + body.daily.data[0].temperatureLow +'. There is a ' + body.currently.precipProbability + '% chance of rain.'
      )
    }
    else {
        callback('Unable to fetch weather', undefined);
    }
  });
};

module.exports = forecast
