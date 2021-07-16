/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
app.use(express.json());

// Env var middleware
require('dotenv').config();

// Cross Origin
const cors = require('cors');
app.use(cors());

// Morgan For logging
const morgan = require('morgan');
morgan.token('body', function (req, res) { return req.method === 'POST' ? JSON.stringify(req.body) : null; });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

// Data
const { persons } = require('./puhelinluettelo.json');

// Front End Build
app.use(express.static('build'));

// Router Routes
const personsRoute = require('./routes/persons');
app.use('/api/persons', personsRoute);



app.get('/info', (req,res) => {
  const message = `
  <p>Phonebook has info for ${persons.length} people.</p>
  <p>${new Date()}</p>`;
  res.send(message);
});

app.use((req,res) => {
  res.status(404).json({ error: 'Route not found!' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});