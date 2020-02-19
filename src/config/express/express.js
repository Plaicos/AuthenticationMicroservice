var express = require("express")
var app = express()
var router = function () {
    let express = require("express")
    return express.Router()
}

// config body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())

module.exports = { express, app, router }