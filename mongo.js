// tehtävä 3.12

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://samapa:${password}@cluster0.nrotuv0.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', numberSchema)

if (process.argv[3] && process.argv[4]) {

  const person= new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then( () => {
    console.log(`added ${person.name} ${person.number} to the phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

