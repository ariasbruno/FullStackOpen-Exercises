const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

// Crear un token personalizado para morgan que registre el cuerpo de las solicitudes POST
morgan.token('post-data', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});

// Configurar morgan para usar el token personalizado junto con otros tokens estándar
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


let persons = 
[
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use((request, response, next) => {
  request.requestTime = Date.now();
  next();
});

function contarEntradas() {
  return persons.length;
}


app.get('/info', (request, response) => {
  const tiempoDeSolicitud = request.requestTime;
  const numeroDeEntradas = contarEntradas();
  response.send(`Phonebook has info for ${numeroDeEntradas} people<br>${new Date(tiempoDeSolicitud)}`);
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  const personIndex = persons.findIndex(person => person.name === body.name);
  if (personIndex !== -1) {
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  }

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'You must assign a name and number'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    console.log('x')
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})