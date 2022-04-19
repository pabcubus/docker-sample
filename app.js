const express = require('express')
const DbDao = require('./src/DbDao')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
console.log('Program running...');

console.log('Initiating connection to DB...')
const dbdao = new DbDao()
dbdao.initConn()
  .then(() => {
    console.log('Connection done!')
  })
  .catch(() => {
    console.log('Error on connection!')
  })