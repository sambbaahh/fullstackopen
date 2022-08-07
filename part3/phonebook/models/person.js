const mongoose = require('mongoose')

const url = process.env.MONGODB_URI


console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const personSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: 3
    },
    number: {
        type: String,
        minlength: 8,
        validate: function(v) {
            return /^(\d{2}-\d{6,})|(\d{3}-\d{5,})$/.test(v)
        }
    },
    id: Number
})

const Person = mongoose.model('Person', personSchema)


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)

