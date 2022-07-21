// Imports
import express from 'express';
import moduleRouter from './routes/modules.js';

// Configure express app
const app = express()

// Configure middleware
app.use(express.json())

// Configure CRUDL endpoints
app.use('/api/modules', moduleRouter)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))