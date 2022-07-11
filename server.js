const express = require('express')
const mongoose = require('mongoose')
const app = express()

//connexion database with server
const mongoUrl ="mongodb+srv://skander4013:skander4013@cluster0.d9exra2.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl, (err)=>{
    err ? console.log(err) : console.log('database is connected')
})

//parse the data
app.use(express.json())
app.use('/persons', require('./Routes/PersonRoutes'))

const port = 5000
app.listen(port,(err)=>{
    err ? console.log(err) : console.log('server is running on port 5000')
})