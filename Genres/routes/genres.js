const express = require('express');
const router = express.Router();

//list
const genres = [
    {id: 1, genre: 'action'},
    {id: 2, genre: 'horror'},
    {id: 3, genre: 'comedy'}
    ];
    
    //get
    router.get('/', (req, res) =>{
        res.send(genres);
    });
    
    //get (by id)
    router.get('/:id', (req, res) =>{
        const genre = genres.find(g => g.id === parseInt(req.params.id));
        if (!genre) return res.status(404).send(`Genre with Id of ${req.params.id} was not found`);
        res.send(genre);
    });
    
    //post
    router.post('/', (req, res) =>{
    
        const schema = {
            genre: Joi.string().min(3).required()
        };
    
        const result = Joi.validate(req.body,schema);
    
        if(result.error) return res.send(result.error.details[0].message);
    
        const genre = {
            id: genres.length +1,
            genre: req.body.genre 
        };
    
        genres.push(genre);
        res.send(genre);
    });
    
    //put
    router.put('/:id', (req, res) =>{
        const genre = genres.find(g => g.id === parseInt(req.params.id));
        if (!genre) return res.status(404).send(`Genre with Id of ${req.params.id} was not found`);
        
        const schema = {
            genre: Joi.string().min(3).required()
        };
        const result = Joi.validate(req.body,schema);
        if(result.error) return res.send(result.error.details[0].message);
    
        genre.genre = req.body.genre;
        res.send(genre);
    });
    
    
    //delete
    router.delete('/:id', (req, res) =>{
        const genre = genres.find(g => g.id === parseInt(req.params.id));
        if (!genre) return res.status(404).send(`Genre with Id of ${req.params.id} was not found`);
        
        const ind = genres.indexOf(genre);
        genres.splice(ind,1);
    
        res.send(genre);
    });
    
    module.exports = router;