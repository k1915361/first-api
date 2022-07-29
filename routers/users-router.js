/*
/localhost:5000/modules

*/ 

// Imports
import { tableOfUsers } from '../data/tableOfUsers.js'
import controller from '../controllers/modules-controller.js';
import { Router } from 'express';


// Configure CRUDL endpoints
const router = Router()

router.get('/', controller.list)

router.get('/:id', (req, res) => {
  // Validate request
  // Access data model
  const user = tableOfUsers.find((user) => user.UserID === parseInt(req.paramsid))
  if (!user) return res.status(404).json({ Message: `Record ${req.params.id} not found`})
  // Response to request
  res.json(user)
})

router.post('/', (req, res) => {
  // Validate request
  // Access data model
  const newUser = { ...req.body, "UserID": tableOfUsers.reduce((max, curr) => currUserID > max.UserID ? curr : max).UserID + 1 }
  tableOfUsers.push(newUser)
  // Response to request
  res.json(newUser)
})

router.put('/:id', (req, res) => {
  // Validate request
  // Access data model
  const module = tableOfUsers.find((module) => module.ModuleID === parseInt(req.params.id))
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
  const index = tableOfUsers.findIndex((module) => module.ModuleID === parseInt(req.params.id))
  if (index<0) return res.status(404).json({ Message: `Record ${req.params.id} not found`})
  tableOfUsers.splice(index, 1);
  // Response to request
  res.json({ Message: `Record ${req.params.id} deleted` })
})

export default router;