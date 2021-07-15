const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('Trying to connect to', url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(res => {
    console.log('Succesfully connected to MONGODB');
  })
  .catch(err => {
    console.error('Unsuccesful connection to MONGODB', err);
  })

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3, 
      unique: true,
      required: true
    },
    number: {
      type: String,
      minlength: 8, 
      unique: true,
      required: true
    }
  })

  personSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Person', personSchema)