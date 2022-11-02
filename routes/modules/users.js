//require express and express router
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

//routes
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect: '/users/login'
}))

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
        message: 'This email already exists!'
      })
    } else if (password !== confirmPassword) {
      console.log('password check not passed')
      res.render('register', {
        name,
        email,
        message: 'Password do not match'
      })
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