//require express and express router
const express = require('express')
const router = express.Router()

//routes
router.get('/login', (req,res) => {
  res.render('login')
})

// export
module.exports = router