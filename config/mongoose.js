const mongoose = require('mongoose') //require mongoose
const MONGODB_URI = process.env.MONGODB_URI
//Mongoose connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) //setting connection to mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})
module.exports = db