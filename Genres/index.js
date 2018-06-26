//include
const Joi = require('joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use(function(req, res, next){
    console.log('Logging...');
    next();
});
app.use('/api/genres',genres);
//server
app.listen(5000, () => console.log('Mano portas yra 5000...'));

