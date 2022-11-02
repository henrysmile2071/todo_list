//require express and express router
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//routes
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/', failureRedirect: '/users/login',
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Please fill out all fields!' })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'This email has already been registered.' })
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
        errors
      })
    } else if (password !== confirmPassword) {
      errors.push({ message: 'Password do not match!' })
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
        errors
      })
    } else {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have logged out successfully')
  res.redirect('/users/login')
})

// export
module.exports = router