const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  dateAdded:{
      type:Date,
      required:true,
      default:Date.now()
  },
  dateActivated:{
      type:Date,
  }
})

module.exports = mongoose.model('User', userSchema)