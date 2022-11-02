//require express and express router
const express = require('express')
const router = express.Router()
//prepare router modules
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const {authenticator} = require('../middleware/auth')

//route '/' to home module
router.use('/todos', authenticator, todos)
router.use('/users',users)
router.use('/', authenticator, home)

//export router
module.exports = router