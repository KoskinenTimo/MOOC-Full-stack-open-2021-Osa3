/**
 * PHONEBOOK ROUTES FOR CRUD OPERATIONS
 */

const express = require('express');
const router = express.Router();
const Person = require('../models/person');


/**
 * Get whole phonebook.
 */
router.get('/', (req,res,next) => {
  Person.find({})
    .then(persons => {
      res.json(persons);
    })
    .catch(err => next(err));
})

/**
 * Get one person from phonebook.
 */
router.get('/:id', (req,res,next) => {
  const id = req.params.id;
  Person.findById(id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        const err = new Error();
        err.message = "Id not found."
        err.status = 404;
        next(err);
      }
      
    })
    .catch(err => next(err))
})

/**
 * Post one person into the phonebook.
 */
router.post('/', (req,res,next) => {
  const newPerson = req.body;
  if (newPerson.name && newPerson.number) {
    const person = new Person(newPerson);
    person.save()
      .then(savedPerson => {
        console.log(`Added ${savedPerson.name}`);
        res.json(savedPerson);
      })
      .catch(err => {
        if(err.errors.name.kind === 'mongoose-unique-validator') {
          err.status = 409;
        }
        next(err);
      })
  } else {
    const err = new Error();
    err.message = 'Name and number required.'
    err.status = 400;
    next(err);
  }
})

/**
 * Updates a person details in phonebook.
 */
router.put('/:id', (req,res,next) => {
  const updatedPerson = req.body;
  const id = req.params.id;
  if (updatedPerson.name && updatedPerson.number) {
    Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then(person => {
      res.json(person)
    })
    .catch(err => next(err))
  } else {
    const err = new Error();
    err.message = 'Name and number required.'
    err.status = 400;
    next(err);
  }

})

/**
 * Deletes a person from phonebook.
 */
router.delete('/:id', (req,res,next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => next(err));
})


module.exports = router;