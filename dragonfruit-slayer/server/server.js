const express       = require('express')
const mongoose      = require('mongoose')
const bodyParser    = require('body-parser')
const cors          = require('cors')

const app           = express()
app.use(cors())
app.use(bodyParser.json())






//MongoDB connection
mongoose.connect(
    'mongodb+srv://user:12345@cluster0.i297s.mongodb.net/dragonfruit?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
)


//Server runs on localhost:3001
app.listen(3001, () => {
    console.log('Listening to port 3001')
})