const {User} = require('../models/user'); 
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();

router.post('/', async (req, res) =>{    
    const result = validate(req.body);   
    if(result.error) return res.status(400).send(result.error.details[0].message);   
    
    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});


function validate(user) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
    };
  
    return Joi.validate(user, schema);
  }

module.exports = router; 

