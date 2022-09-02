//Import required
const express = require('express')
const app = express()

//Setting routes
app.get('/', (req, res) => {
  res.send('hello world')
})

//Open and listen to server port
const port = 3000
app.listen(port, () => {
  console.log(`Start listening on http://localhost:${port}`)
})
