// Imports
import express from 'express';
// import router from './routers/modules.js';
import controller from './routers/modules-router.js';

router = controller

// Configure express app
const app = express()

// Configure middleware
app.use(express.json())

// Configure CRUDL endpoints
app.use('/api/modules', controller)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))