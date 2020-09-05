const express  = require('express')
const ejs      = require('ejs')
const mongoose = require('mongoose')
const morgan   = require('morgan')

const server = express()

// Connect to database
mongoose.connect('mongodb+srv://ce:anyone@mycluster.b0puj.mongodb.net/app?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(
  db => console.log('OK'),
  error => console.log( error )
)



// Settings
server.set('view engine', 'ejs')
server.set('port', process.env.PORT || 8080)

// Middlewares
server.use('/statics' ,express.static('public'))
server.use(express.json())
server.use(morgan('dev'))


// Routes
server.use(require('./routes/routes.js'))

server.listen(server.get('port'))