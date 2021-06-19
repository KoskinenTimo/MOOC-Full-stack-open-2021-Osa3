const express = require('express');
const app = express();
app.use(express.json());

const morgan = require('morgan');
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

// Data
const { persons } = require('./puhelinluettelo.json');

// Router routes
const personsRoute = require('./routes/persons');
app.use('/api/persons', personsRoute)


app.get('/info', (req,res) => {
  const message = `
  <p>Phonebook has info for ${persons.length} people.</p>
  <p>${new Date()}</p>`
  res.send(message);
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})