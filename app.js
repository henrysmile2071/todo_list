//Import required
const express = require('express')
const mongoose = require('mongoose') //require mongoose
const exphbs = require('express-handlebars')

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //setting connection to mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

//Setting routes
app.get('/', (req, res) => {
  res.render('index')
})

//Open and listen to server port
const port = 3000
app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`)
})
