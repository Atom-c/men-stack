console.log("This worked.");

const express = require('express');
const bodyParser= require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(express.static('public'))

var db

MongoClient.connect('mongodb://atomc:tutorial1@ds021434.mlab.com:21434/commentbox', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
   if (err) return console.log(err)
   // renders index.ejs
   res.render('index.ejs', {quotes: result})
 })
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

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Person'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
