// Imports
import { Router } from 'express'
import model from '../model/database/modules-model.js'
import schema from '../validator/modules-schema.js'
import Validator from "../validator/Validator.js"
import Accessor from '../model/database/Accessor.js'
import Controller from "../controllers/Controller.js"

// Configure CRUDL endpoints ---------------------
const router = Router();

// Configure validator --------------------------
const validator = new Validator(schema);

// Configure accessor ---------------------------
const accessor = new Accessor(model);

// Configure controller --------------------------
const controller = new Controller(validator, accessor);

// List all records
router.get('/', controller.list);

// Read specific record
router.get('/:id', controller.get);

// Create record
router.post('/', controller.post);

// Update specific record
router.put('/:id', controller.put);

// Delete specific record
router.delete('/:id', controller.delete);

export default router;


