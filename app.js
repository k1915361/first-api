// Imports
import express from 'express';
import modulesRouter from './router/modules-router.js';
import usersRouter from './router/users-router.js';

// Configure express app
const app = express()

// Configure middleware
// app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(express.json())


// Configure CRUDL endpoints
app.use('/api/modules', modulesRouter)
app.use('/api/users', usersRouter)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))