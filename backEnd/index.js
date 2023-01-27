const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

//create a server express
const app = express()

//mongooseDB
dbConnection()

//cors
app.use(cors())

//Public directory
app.use(express.static('public'))

//bodyParse
app.use(express.json())

//routers
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//CRUD events

//listing the request 
app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`)
})