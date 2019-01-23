const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todos')
const { User } = require('./models/users')

let app = express()
const port = process.env.PORT || 3000

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

app.get('/todos', (req, res) => {
  Todo.find({})
    .then(todos => {
      res.send({ todos })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send()
      }
      res.send({ todo })
    })
    .catch(err => {
      res.status(400).send()
    })
})

app.listen(port, () => {
  console.log(`Connected to port: ${port}`)
})

module.exports = {
  app
}
