const Joi = require('joi');

const express = require('express');
const app = express();

app.use(express.json());

const siemkos = [
{id: 1, name: 'siemka1', rusis: 'dryzuota'},
{id: 2, name: 'siemka2', rusis: 'juoda'},
{id: 3, name: 'siemka3', rusis: 'pilka'}
];

app.get('/siemkos', (req, res)=>{
    res.send(siemkos);
});

app.get('/siemkos/:id', (req, res)=>{
  const siemka =siemkos.find(s => s.id === parseInt(req.params.id));
  if(!siemka) res.status(404).send(`Siemka su ID: ${req.params.id} nerasta`);
  res.send(siemka);
});

app.post('/siemkos',(req,res) =>{
    const schema = {
        name: Joi.string().min(2).required(),
        rusis: Joi.string().min(3).max(10).required(),
    };

    const result = Joi.validate(req.body, schema);

    if(result.error)
        return res.status(400).send(result.error.details[0].message);

    const siemka = {
        id: siemkos.length + 1,
        name: req.body.name,
        rusis: req.body.rusis
    };

    siemkos.push(siemka);
    res.send(siemka);

});

app.put('/siemkos/:id' , (req, res) => {
  const siemka =siemkos.find(s => s.id === parseInt(req.params.id));
  if(!siemka) return res.status(404).send(`Siemka su ID: ${req.params.id} nerasta`);
  
  const { error } = validateSiemka(req.body)
  if(error) return res.status(400).send(error.details[0].message);

  siemka.name = req.body.name;
  siemka.rusis = req.body.rusis;

  res.send(siemka);

});

app.delete('/siemkos/:id', (req, res) =>{
    const siemka =siemkos.find(s => s.id === parseInt(req.params.id));
    if(!siemka) return res.status(404).send(`Siemka su ID: ${req.params.id} nerasta`);
    
    const ind = siemkos.indexOf(siemka);
    siemkos.splice(ind,1);

    res.send(siemka);
});

function validateSiemka(siemka){
    const schema = {
        name: Joi.string().min(2).required(),
        rusis: Joi.string().min(3).max(10).required(),
      };
    
      return result = Joi.validate(siemka, schema);
}

app.listen(5000, () => console.log('Mano portas yra 5000...'));
