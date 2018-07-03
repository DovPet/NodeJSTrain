//const asyncMiddleware = require('../middleware/async');
const {Genre} = require('../models/genre');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

    //get
    router.get('/', async (req, res) =>{   
        throw new Error('Erroras');    
        const genres = await Genre.find().sort('name');
        res.send(genres);
    });
    
    //get (by id)
    router.get('/:id', async (req, res) =>{
        const genre = await Genre.findById(req.param.id);
        if (!genre) return res.status(404).send(`Genre with Id of ${req.params.id} was not found`);
        res.send(genre);
    });
    
    //post
    router.post('/', auth,async (req, res) =>{
    
        const schema = {
            name: Joi.string().min(3).required()
        };
        const result = Joi.validate(req.body,schema);   
        if(result.error) return res.send(result.error.details[0].message);   
        const genre = new Genre({ name: req.body.name });
        await genre.save();
        res.send(genre);
    });
    
    //put
    router.put('/:id', auth,async (req, res) =>{
        const schema = {
            name: Joi.string().min(3).required()
        };
        const result = Joi.validate(req.body,schema);   
        if(result.error) return res.status(400).send(result.error.details[0].message);

        const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
        if (!genre) return res.status(404).send(`Genre with Id of ${req.params.id} was not found`);        

        genre.name = req.body.name;

        res.send(genre);
    });
    
    
    //delete
    router.delete('/:id', [auth, admin] ,async (req, res) =>{
        const genre = await Genre.findByIdAndRemove(req.params.id);
        
        if (!genre) return res.status(404).send(`Genre with Id of ${req.params.id} was not found`);
            
        res.send(genre);
    });
    
    module.exports = router;