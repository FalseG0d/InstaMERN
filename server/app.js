//-------------------Requires and Imports Starts--------------------------//
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')

const PORT = 5000

require('./models/User')
require('./models/Post')

//-------------------Requires and Imports Ends--------------------------//


//-------------------Database Management Starts--------------------------//

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
    console.log("Connected To Database")
})
mongoose.connection.on('error', (err) => {
    console.log("An Error has Occured: ", err)
})

//-------------------Database Management Ends--------------------------//

//-------------------Middleware Starts--------------------------//

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

//-------------------Middleware Ends--------------------------//

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log("Server is Running On", PORT);
})