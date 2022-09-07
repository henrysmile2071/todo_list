//require express and express router
const express = require('express')
const router = express.Router()
//prepare router modules
const home = require('./modules/home')
const todos = require('./modules/todos')

//route '/' to home module
router.use('/', home)
router.use('/todos', todos)

//export router
module.exports = router
