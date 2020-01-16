'use strict';

// basic server setup

// load env variables
require('dotenv').config();

// require application dependencies
const express = require('express');
const cors = require('cors');

// application setup
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Home page up!');
})

// route definitions
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.use('*', notFoundHandler);
app.use(errorHandler);

// route handlers
function locationHandler(request, response) {
  try {
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    const locationData = new Location(city, geoData);
    response.status(200).send(locationData);
  }
  catch (error) {
    errorHandler('So sorry, something went wrong.', request, response);
  }
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

function weatherHandler(request, response) {
  const weatherData = require('./data/darksky.json');
  const weatherSummaries = [];
  console.log(weatherData);
  weatherData.daily.data.forEach( day => {
    weatherSummaries.push(new Weather(day))
  })
  response.status(200).json(weatherSummaries);
}

function Weather (day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
}

// error handlers

function notFoundHandler(request, response) {
  response.status(404).send('huh?');
}

function errorHandler(error, request, response) {
  console.log('ERROR', error);
  response.status(500).send(error);
}


// port listener
app.listen(PORT, () => {
  console.log(`Port ${PORT} is listening!`)
});

