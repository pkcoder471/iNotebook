const connectTOMongo = require("./db");

connectTOMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json());  


app.use('/api',require('./routes'));


app.listen(port, () => {
  console.log(`Server in running on port ${port}`)
}) 