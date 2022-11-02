const mongoose = require('mongoose') //require mongoose
//Mongoose connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) //setting connection to mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})
module.exports = db