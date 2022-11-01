//require express and express router
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
//routes
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('email exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
        message: 'This email already exists!' })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

// export
module.exports = router