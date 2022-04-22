const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const DbDao = require('./src/DAO/DbDao')
const createApiClient = require('./src/Endpoints/apiClient')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)

const services = ['users', 'orders'].map(name => ({
  name,
  ...createApiClient(name)
}))

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