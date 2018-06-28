const {Customer} = require('../models/customer');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) =>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

//get (by id)
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(customer);
  });

//post
router.post('/', async (req, res) =>{

    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(15).required(),
        isGold: Joi.boolean()
    };
    const result = Joi.validate(req.body,schema);   

    if(result.error) return res.send(result.error.details[0].message);   
    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold 
    });
    customer = await customer.save();
    res.send(customer);
});

//put
router.put('/:id', async (req, res) =>{
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(15).required(),
        isGold: Joi.boolean()
    };
    const result = Joi.validate(req.body,schema);   
    
    if(result.error) return res.status(400).send(result.error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {name: req.body.name,
         phone: req.body.phone,
         isGold: req.body.isGold },
        {new: true});

    if (!customer) return res.status(404).send(`Customer with Id of ${req.params.id} was not found`);        

    customer.name = req.body.name;
    customer.isGold = req.body.isGold;
    customer.phone = req.body.phone;

    res.send(customer);
});


//delete
router.delete('/:id', async (req, res) =>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    
    if (!customer) return res.status(404).send(`Customer with Id of ${req.params.id} was not found`);
        
    res.send(customer);
});

module.exports = router;


