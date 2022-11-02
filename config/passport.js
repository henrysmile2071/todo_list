const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
module.exports = app => {
  //initialize passport module
  app.use(passport.initialize())
  app.use(passport.session())
  //setup strategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error', { message: 'Email not registered!' }))
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('error', { message: 'Email or Password incorrect.' }))
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  //setup serialize and deserailize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}