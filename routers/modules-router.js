import controller from "../controllers/modules-controller";
import router from "./modules";
import { Router } from 'express';

// Configure CRUDL endpoints
const router = Router()

// List all records
router.get('/', controller.list)

router.get('/:id', controller.read)

router.post('/', controller.post)

router.put('/:id', controller.put)

reouter.delete('/:id', controller.delete)

const post = (req, res) => {
  // Validate request
  // Access data model
  const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id))
  if (!module) res.status(404).json({ Message: `Record ${req.params.id} not found`})
  // Response to request
  res.json(module)
}

const put = (req, res) => {
  // Validate request
  // Access data model
  const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id))

  if (!module) res.status(404).json({ Message: `Record ${req.params.id} not found`})
  ["ModuleName", "ModuleCode","ModuleLevel","ModuleLeaderID","ModuleImageURL"].map((key) => {
    module[key] = req.body[key] || module[key]
  })
  // Response to request
  res.json(module)
}

const controller = {}
controller.list = list
controller.read = read
controller.post = post
controller.put = put