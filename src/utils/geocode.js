const request = require('request')

const geocode = (address, longitude, latitude, callback) =>{
 const encodedAddress = encodeURIComponent(address);
  const access_key = 'pk.eyJ1IjoidmFtc2Vla3Jpc2huYWthdHRpa2EiLCJhIjoiY2p0Z2lwdzI2MDN1dTN5cXIxZDd1czkwayJ9.1fAxtRbecQ4Lh-iTF13SIQ';
  let url = undefined
  if (address){
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodedAddress + '.json?access_token=' + access_key
  }
  if (latitude && longitude){
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=' + access_key
  }
 
  request({
    url,
    json:true
  },(error,{ body }) =>{
    if(error){
      callback('Unable to connect to location servers!', undefined);
    }
    else if(body.features.length === 0){
      callback('Unable to find \'' + address + '\' Try another search', undefined);
    }
    else {
      callback(undefined,{
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],        
        location : body.features[0].place_name
      });
    }
  });
};

module.exports = geocode
