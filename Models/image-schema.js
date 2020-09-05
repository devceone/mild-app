const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  title: {type: String, required: true},
  file: {type: Object, required: true},
  state: {type: Boolean, default: false}
})

module.exports = mongoose.model('mySchema', schema)