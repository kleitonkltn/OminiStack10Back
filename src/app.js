var express = require('express')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes')
require('dotenv').config()

var app = express()

mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use(routes)



module.exports = app