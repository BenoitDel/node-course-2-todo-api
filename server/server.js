const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todos')
const { User } = require('./models/users')

let app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let newTodo = new Todo({
    text: req.body.text
  })

  newTodo.save()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.listen(3000, () => {
  console.log('Connected to port: 3000')
})

module.exports = {
  app
}
