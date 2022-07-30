// import router from "./modules";
import { Router } from 'express';
import controller from "../controllers/modules-controller.js";
import { tableOfModules } from '../data/tableOfModules.js';

// Configure CRUDL endpoints
const router = Router()

// List all records
router.get('/', controller.list)

router.get('/:id', controller.get)

router.post('/', controller.post)

router.put('/:id', controller.put)

router.delete('/:id', controller.delete)

export default router