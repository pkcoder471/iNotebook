const connectTOMongo = require("./db");

connectTOMongo();

const express = require('express')
const app = express()
const port = 3000


app.use('/api',require('./routes'));

app.get('/api/v1/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server in running on port ${port}`)
}) 