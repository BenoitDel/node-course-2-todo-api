const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Enable to connect to MongoDB server')
  }

  const db = client.db('TodoApp')

  db.collection('Users').findOneAndUpdate({ name: 'Benoit' }, { $inc: { age: 7 } }, { returnOriginal: false })
    .then(res => console.log)

  client.close()
})
