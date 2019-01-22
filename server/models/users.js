let { mongoose } = require('../db/mongoose')

let User = mongoose.model('user', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

module.exports = {
  User
}
