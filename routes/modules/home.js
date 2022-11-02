//require express and express router
const express = require('express')
const router = express.Router()
//require Todo model
const Todo = require('../../models/todo')
//homepage route
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))
    .catch(err => console.error(err))
})

//export router module
module.exports = router