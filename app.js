const express = require('express')
const DbDao = require('./src/DAO/DbDao')
const createApiClient = require('./src/Endpoints/apiClient')
const app = express()

const services = [
  {
    name: 'users',
    ...createApiClient('users')
  },{
    name: 'orders',
    ...createApiClient('orders')
  }
]

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
    services.forEach(s => {
      app.use(`/${s.name}`, s.router)
    })
    dbdao.closeConn()
  })
  .catch(() => {
    console.log('Error on DB Connection!')
  })