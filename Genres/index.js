//include
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');


const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(()=> console.log('Connected to the database...'))
.catch(err => console.error('Could not connect...'));


app.use(express.json());
app.use(function(req, res, next){
    console.log('Logging...');
    next();
});
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
//server
app.listen(5000, () => console.log('Mano portas yra 5000...'));

