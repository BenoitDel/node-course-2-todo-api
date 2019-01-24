require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todos')
const { User } = require('./models/users')

let app = express()
const port = process.env.PORT

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
      res.status(400).send(err)
    })
})

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findByIdAndDelete(id)
    .then(todo => {
      if (!todo) {
        return res.status(400).send()
      }

      return res.send({ todo })
    })
    .catch(err => res.status(404).send(err))
})

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectId.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({ todo })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

/// /////////////////////////
//    Connection part     //
/// /////////////////////////

app.listen(port, () => {
  console.log(`Connected to port: ${port}`)
})

module.exports = {
  app
}
