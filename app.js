const express = require('express')
const DbDao = require('./src/DAO/DbDao')
const app = express()

const users = require('./src/Endpoints/users');

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)

console.log('Initiating connection to DB...')
const dbdao = new DbDao()

Promise.all([
  dbdao.initConn()
]).then(() => {
    console.log('DB Connection done!')
    console.info('Program running...');
    app.use('/users', users)
    dbdao.closeConn()
  })
  .catch(() => {
    console.log('Error on DB Connection!')
  })