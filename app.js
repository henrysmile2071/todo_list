//Import required
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const { TopologyDescription } = require('mongodb')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const session = require('express-session')
const usePassport = require('./config/passport')
//Handlebars Start engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//Session
app.use(session({
  secret: "mylittleSecret",
  resave: false,
  saveUninitialized: true
}))

//Bodyparser Start
app.use(bodyParser.urlencoded({ extended: true }))

//Method Override Start
app.use(methodOverride('_method'))

//Use Passport
usePassport(app)

//Use routes
app.use(routes)

//Open and listen to server port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Start listening on http://localhost:${PORT}`)
})
