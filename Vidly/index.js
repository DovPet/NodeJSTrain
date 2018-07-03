//includes
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')(); 
require('./startup/routes')(app);
require('./startup/db')(); 
require('./startup/config')(); 
require('./startup/validation')(); 
//server
app.listen(5000, () => winston.info('Mano portas yra 5000...'));

