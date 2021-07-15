const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://timokoskinen:${password
}@cluster0.mnkgc.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {

  Person.find({})
    .then(result => {
      console.log("phonebook:");
      result.forEach(record => {
        console.log(`${record.name} ${record.number}`);
      })
      mongoose.connection.close();
    })
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name: name,
    number: number
  })
  
  person.save().then(response => {
    console.log(`Added ${name} number ${number} to phonebook.`)
    mongoose.connection.close()
  })
}