// Imports
import joi from 'joi'
import { tableOfModules } from "../data/tableOfModules.js";

// Schema

const idSchema = joi.number().integer().min(1).required()

const objSchema = joi.object({
  ModuleID: joi.number().integer(),
  ModuleName: joi.string().min(8),
  ModuleCode: joi.string().regex(/^\D{2}\{4}$/),
  ModuleLevel: joi.number().integer().min(3).max(7),
  ModuleLeaderID: joi.number().integer(),
  ModuleImageURL: joi.string().uri(),
})

const mutableAttributes = ['ModuleName', 'ModuleCode', 'ModuleLevel','ModuleLeaderID','ModuleImageURL']

const createSchema = objSchema.and( ...mutableAttributes )

const updateSchema = joi.object({ 
  id: idSchema, 
  obj: objSchema.or(...mutableAttributes)
})


// Methods

const reportErrors = (error) => error.details.map(detail => detail.message)

const list = (req, res) => {
  // Validate request
  // Access data model
  // Response to request
  res.json(tableOfModules)
}

const get = (req, res) => {
  // Validate request
  const { error } = idSchema.validate(req.params.id)
  if(error) return res.status(400).json({ message: reportErrors(error) })

  // Access data model
  const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id))
  if (!module) return res.status(404).json({ Message: `Record ${req.params.id} not found`})
  
  // Response to request
  res.json(module)
}

const post = (req, res) => {
  // Validate request
  const { error } = createSchema.validate(req.body, {abortEarly: false})
  if (error) return res.status(400).json({ message: reportErrors(error) })
  
  // Access data model
  const newModule = {...req.body, "ModuleID": tableOfModules.reduce((max, curr) => curr.ModuleID > max.ModuleID ? curr : max).ModuleID }
  tableOfModules.push(newModule)
  
  // Response to request
  res.json(module)
}

const put = (req, res) => {
  // Validate request
  const { error } = updateSchema.validate({ id: req.params.id, obj: req.body }, {abortEarly: false})
  if (error) return res.status(400).json({ message: reportErrors(error) })
  
  // Access data model
  const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id)) 
  if(!module) return res.status(404).json({ message: `Record ${req.params.id} not found` })
  mutableAttributes.map((key) => module[key] = req.body[key] || module[key] )
  
  // Response to request
  res.json(module)
}

const _delete = (req, res) => {
  // Validate request
  const { error } = idSchema.validate(req.params.id)
  if(error) return res.status(400).json({ message: reportErrors(error) })

  // Access data model
  const index = tableOfModules.findIndex((module) => module.ModuleID === parseInt(req.params.id))
  if (index < 0) return res.status(404).json({ Message: `Record ${req.params.id} not found`})
  tableOfModules.splice(index, 1);
  
  // Response to request
  res.json({ Message: `Record ${req.params.id} deleted` })
}

const controller = {}
controller.list = list
controller.get = get
controller.post = post
controller.put = put
controller._delete = _delete

export default controller