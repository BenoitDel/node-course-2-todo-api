const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Enable to connect to MongoDB server')
  }

  const db = client.db('TodoApp')

  db.collection('Users').insertMany([{
    name: 'Jen',
    age: 25,
    location: 'Philadelphia'
  },
  {
    name: 'Mike',
    age: 25,
    location: 'Philadelphia'
  },
  {
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  },
  {
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }])
    .then(res => { console.log(JSON.stringify(res, undefined, 2)) })
    .catch(err => console.log)

  client.close()
})
