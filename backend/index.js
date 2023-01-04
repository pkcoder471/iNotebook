const connectTOMongo = require("./db");
const express = require('express')
var cors = require('cors')

connectTOMongo();


const app = express()
const port = 5000

app.use(cors())

app.use(express.json());  


app.use('/api',require('./routes'));


app.listen(port, () => {
  console.log(`Server in running on port ${port}`)
}) 