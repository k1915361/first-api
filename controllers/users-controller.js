// Import
import { tableOfUsers } from '../data/tableOfUsers' 

// Schema
const idSchema = joi.number().integer().min(1).required()

const objSchema = joi.object({
  UserID: joi.number().integer(),
  UserFirstname: joi.string().min(1),
  UserLastname: joi.string().min(1),
  UserEmail: joi.string().email(),
  UserPassword: joi.string().regex(/^(?=.*[A-z])^(?=.*[0-9])(?=.*[#?!@$ %^&*-]).{8,}$/),
  UserRegistered: joi.boolean(),
  UserUsertypeID: joi.number().integer(),
  UserLevel: joi.number().integer().min(3).max(7),
  UserImageURL: joi.string().uri(),
})

const mutableAttributes = ['UserFirstname','UserLastname','UserEmail','UserPassword','UserRegistered','UserUsertypeID', 'UserLevel','UserImageURL']

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
  res.json(tableOfUsers)
}

const get = (req, res) => {
  // Validate request
  const { error } = idSchema.validate(req.params.id)
  if(error) return res.status(400).json({ message: reportErrors(error) })

  // Access data model
  const module = tableOfUsers.find((module) => module.ModuleID === parseInt(req.params.id))
  if (!module) return res.status(404).json({ Message: `Record ${req.params.id} not found`})
  
  // Response to request
  res.json(module)
}

const post = (req, res) => {
  // Validate request
  const { error } = createSchema.validate(req.body, {abortEarly: false})
  if (error) return res.status(400).json({ message: reportErrors(error) })
  
  // Access data model
  const newUser = {...req.body, "UserID": tableOfUsers.reduce((max, curr) => curr.ModuleID > max.ModuleID ? curr : max).ModuleID }
  tableOfUsers.push(newUser)
  
  // Response to request
  res.json(module)
}

const put = (req, res) => {
  // Validate request
  const { error } = updateSchema.validate({ id: req.params.id, obj: req.body }, {abortEarly: false})
  if (error) return res.status(400).json({ message: reportErrors(error) })
  
  // Access data model
  const user = tableOfUsers.find((module) => module.ModuleID === parseInt(req.params.id)) 
  if(!user) return res.status(404).json({ message: `Record ${req.params.id} not found` })
  mutableAttributes.map((key) => user[key] = req.body[key] || user[key] )
  
  // Response to request
  res.json(user)
}

const _delete = (req, res) => {
  // Validate request
  const { error } = idSchema.validate(req.params.id)
  if(error) return res.status(400).json({ message: reportErrors(error) })

  // Access data model
  const index = tableOfUsers.findIndex((module) => module.ModuleID === parseInt(req.params.id))
  if (index < 0) return res.status(404).json({ Message: `Record ${req.params.id} not found`})
  tableOfUsers.splice(index, 1);
  
  // Response to request
  res.json({ Message: `Record ${req.params.id} deleted` })
}


// Compose controller

const controller = {}
controller.list = list
controller.get = get
controller.post = post
controller.put = put
controller._delete = _delete

export default controller