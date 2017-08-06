console.log("This worked.");

const express = require('express');
const bodyParser= require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }))

var db

MongoClient.connect('mongodb://atomc:tutorial1@ds021434.mlab.com:21434/commentbox', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
  console.log('Here we are at quotes', req.body);
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })

  db.collection('quotes').find().toArray(function(err, results) {
    console.log(results)
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
})
