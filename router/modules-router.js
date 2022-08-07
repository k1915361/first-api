// Imports
import { Router } from 'express'
import model from '../model/datafiles/modules-model.js'
import schema from '../validator/modules-schema.js'
import Validator from "../validator/Validator.js"
import Accessor from '../model/datafiles/Accessor.js'
import Controller from "../controllers/Controller.js"

// Configure CRUDL endpoints
const router = Router()

// Configure Validator
const validator = new Validator(schema)

// Configure Accessor
const accessor = new Accessor(model)

// Configure Controller
const controller = new Controller(validator, accessor)

// List all records
router.get('/', controller.list)

router.get('/:id', controller.get)

router.post('/', controller.post)

router.put('/:id', controller.put)

router.delete('/:id', controller.delete)

export default router