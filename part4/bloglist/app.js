const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app

