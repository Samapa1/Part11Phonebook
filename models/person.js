const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validateNumber = (num) => {
  let count = 0
  for (let i = 0; i < num.length; i++) {
    if (num[i] === '-') {
      count++
    }
  }

  if (count === 1) {
    let parts = num.split('-')
    if (parts[0].length >1 && parts[0].length <4 && parts[0].length + parts[1].length >7) {
      return true
    }
  }
  return false
}

const numberSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: validateNumber,
      message: 'Please write the number (minimum 8 digits) in one of the following formats: 123-12345 or 12-123456'
    }
  }
})

numberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', numberSchema)