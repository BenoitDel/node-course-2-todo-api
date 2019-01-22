const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Enable to connect to MongoDB server')
  }

  const db = client.db('TodoApp')

  db.collection('Users').findOneAndDelete({ name: 'Andrew' })
    .then(res => { console.log(res) })

  db.collection('Users').deleteMany({ name: 'Mike' })
    .then(res => { console.log(res) })

  client.close()
})
