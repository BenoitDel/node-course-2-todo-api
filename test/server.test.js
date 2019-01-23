const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')

const { app } = require('../server/server')
const { Todo } = require('../server/models/todos')

const todos = [
  {
    _id: new ObjectID(),
    text: 'first text todo'
  },
  {
    _id: new ObjectID(),
    text: 'second text todo'
  },
  {
    _id: new ObjectID(),
    text: 'third text todo'
  }
]

beforeEach((done) => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos)
    })
    .then(() => done())
})

describe('POST /todos', () => {
  it('should create a post todo', (done) => {
    let text = 'test todo text'
    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          })
          .catch((e) => {
            done(e)
          })
      })
  })

  it('should not create todo with invalid body data', (done) => {
    let text = ''

    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(3)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(3)
      })
      .end(done)
  })
})

describe('Get /todos/:id', () => {
  it('should return a todo matched by ID', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should return a 404 if todo not found', (done) => {
    let id = new ObjectID().toHexString()

    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 for invalid ID', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done)
  })
})
