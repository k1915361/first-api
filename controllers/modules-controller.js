// Imports
import joi from 'joi'
import records from "../data/tableOfModules.js";

// Model
const idKey = 'ModuleID'
const mutableKeys = ['ModuleName', 'ModuleCode', 'ModuleLevel','ModuleLeaderID','ModuleImageURL']


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


const createSchema = objSchema.and( ...mutableKeys )

const updateSchema = joi.object({ 
  id: idSchema, 
  obj: objSchema.or(...mutableKeys)
})


// Methods

const reportErrors = (error) => error.details.map(detail => detail.message)

const list = (req, res) => {
  // Validate request
  // Access data model
  // Response to request
  res.json(records)
}

const get = (req, res) => {
  // Validate request
  const { error } = idSchema.validate(req.params.id)
  if(error) return res.status(400).json({ message: reportErrors(error) })

  // Access data model
  
  const record = records.find((record) => record[idKey] === parseInt(req.params.id))
  if (!record) return res.status(404).json({ Message: `Record ${req.params.id} not found`})
  
  // Response to request
  res.json(record)
}

const post = (req, res) => {
  // Validate request
  const { error } = createSchema.validate(req.body, {abortEarly: false})
  if (error) return res.status(400).json({ message: reportErrors(error) })
  
  // Access data model
  const record = {...req.body, [idKey]: records.reduce((max, curr) => curr[idKey] > max[idKey] ? curr : max)[idKey] }
  records.push(record)
  
  // Response to request
  res.json(record)
}


const put = (req, res) => {
  // Validate request
  const { error } = updateSchema.validate({ id: req.params.id, obj: req.body }, {abortEarly: false})
  if (error) return res.status(400).json({ message: reportErrors(error) })
  
  // Access data model
  const record = records.find((record) => record[idKey] === parseInt(req.params.id)) 
  if(!record) return res.status(404).json({ message: `Record ${req.params.id} not found` })
  mutableKeys.map((key) => record[key] = req.body[key] || record[key] )
  
  // Response to request
  res.json(record)
}

const _delete = (req, res) => {
  // Validate request
  const { error } = idSchema.validate(req.params.id)
  if(error) return res.status(400).json({ message: reportErrors(error) })

  // Access data model
  const index = records.findIndex((record) => record[idKey] === parseInt(req.params.id))
  if (index < 0) return res.status(404).json({ Message: `Record ${req.params.id} not found`})
  records.splice(index, 1);
  
  // Response to request
  res.json({ Message: `Record ${req.params.id} deleted` })
}

const controller = {}
controller.list = list
controller.get = get
controller.post = post
controller.put = put
controller.delete = _delete

export default controller