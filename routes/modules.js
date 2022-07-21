// Imports
import { Router } from 'express';
import { tableOfModules } from '../data/tableOfModules.js'


// Configure CRUDL endpoints
const router = Router()


router.get('/', (req, res) => {
  // Validate request
  // Access data model
  // Response to request
  res.json(tableOfModules)
})


router.get('/:id', (req, res) => {
  // Validate request
  // Access data model
  const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id))
  if (!module) res.status(404).json({ Message: `Recrod ${req.params.id} not found`})
  // Response to request
  res.json(module)
})

router.post('/', (req, res) => {
  // Validate request
  // Access data model
  const newModule = { ...req.body, "ModuleID": tableOfModules.length + 1 }
  tableOfModules.push(newModule)
  // Response to request
  res.json(newModule)
})

router.put('/:id', (req, res) => {
  // Validate request
  // Access data model
  const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id))
  if (!module) res.status(404).json({ Message: `Recrod ${req.params.id} not found`})
  module.ModuleName = req.module.ModuleName || module.ModuleName
  module.ModuleCode = req.module.ModuleCode || module.ModuleCode
  module.ModuleLevel = req.module.ModuleLevel || module.ModuleLevel
  module.ModuleLeaderID = req.module.ModuleLeaderID || module.ModuleLeaderID
  module.ModuleImage = req.module.ModuleImage || module.ModuleImage
  // Response to request
  res.json(module)
})

router.delete('/:id', (req, res) => {
  // Validate request
  // Access data model
  const index = tableOfModules.findIndex((module) => module.ModuleID === parseInt(req.params.id))
  if (index<0) return res.status(404).json({ Message: `Recrod ${req.params.id} not found`})
  tableOfModules.splice(index, 1);
  // Response to request
  res.json({ Message: `Record ${req.params.id} deleted` })
})

export default router;