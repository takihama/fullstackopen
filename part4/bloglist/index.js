const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URL, PORT } = require('./utils/config')
const { info, error } = require('./utils/logger')
const Blog = require('./models/blog')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(MONGODB_URL)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch(err => {
    error('Error connecting to MongoDB:', err.message)
  })

app.use(cors()) // Allow requests from multiple origins
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})