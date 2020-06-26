const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  apiKey: process.env.MAP_QUEST_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
