const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const personsRouter = require('./controllers/persons')

morgan.token('personData', function(req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return '  '

})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(cors())

app.use(express.json())

app.use(express.static('dist'))

app.use(morgan(':method :url :status :res[content-length] :response-time ms :personData'))

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/info', (request, response) => {
  let dateTime = new Date()
  let counts = 0
  Person.countDocuments({}).then(count => {
    counts += count
    let message = `<p>Phonebook has info for ${counts} people</p><p>${dateTime}</p>`
    response.send(message)
  })
})

app.use('/api/persons', personsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)