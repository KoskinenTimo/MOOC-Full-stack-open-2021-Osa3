const express = require('express');
const router = express.Router();
let { persons } = require('../puhelinluettelo.json');


router.get('/:id', (req,res) => {
  const id = Number(req.params.id);
  const note = persons.find(person => person.id === id)
  if (note) {
    res.status(200).json(note)
  } else {
    res.status(404).end();
  }
})

router.post('/', (req,res) => {
  const newPerson = req.body;
  if (newPerson.name && newPerson.number) {
    if (persons.find(person => person.name === newPerson.name)) {
      res.status(403).json({error:"Name must be unique"})
    } else {
      newPerson.id = Math.floor(Math.random()*100000);
      persons.push(newPerson);
      res.json(newPerson);
    }
  } else {
    res.status(400).json({error:"No Content"})
  }
})

router.delete('/:id', (req,res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end()
})

module.exports = router;