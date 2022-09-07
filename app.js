//Import required
const express = require('express')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const app = express()
const bodyParser = require('body-parser')
const { TopologyDescription } = require('mongodb')
const methodOverride = require('method-override')
const routes = require('./routes')
const router = require('./routes/modules/home')
require('./config/mongoose')
//Handlebars Start engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//Bodyparser Start
app.use(bodyParser.urlencoded({ extended: true }))

//Method Override Start
app.use(methodOverride('_method'))

//Use routes
app.use(routes)

//Open and listen to server port
const port = 3000
app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`)
})
