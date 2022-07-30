// Imports
import { Router } from 'express';
import model from '../controllers/users-model.js'
import schema from '../controllers/users-schema.js'
import records from '../data/tableOfUsers.js'
import Controller from "../controllers/Controller.js"


// Configure CRUDL endpoints
const router = Router()

// Configure Controller
const controller = new Controller(model, schema, records)


// List all records
router.get('/', controller.list)

router.get('/:id', controller.get)

router.post('/', controller.post)

router.put('/:id', controller.put)

router.delete('/:id', controller.delete)

export default router

/*

/localhost:5000/users modules/1

*/ 