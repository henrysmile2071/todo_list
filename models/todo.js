const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, 
    required: true //required field
  },
  isDone: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('Todo', todoSchema)