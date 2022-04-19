const { MongoClient, Db } = require('mongodb');
const url = 'mongodb://root:password@localhost:27017/';

class DbDao {
  collections = ['users', 'orders']

  constructor(name = 'dockerdb') {
    this.name = name
  }

  closeConn() {
    this.db.close();
  }

  initConn() {
    return new Promise((res, err) => {
      MongoClient.connect(url, async (err, db) => {
        if (err) throw err;
        let missingCollections = this.collections
        this.db = db;
        this.dbo = db.db(this.name);
  
        const arr = await this.dbo.listCollections().toArray()
        arr.forEach(co => {
          const coName = co.name
          missingCollections = missingCollections.filter(mco => mco !== coName) 
        });
  
        if (missingCollections.length > 0) {
          const promises = missingCollections.map(co => {
            this.dbo.createCollection(co)
            console.log('create ' + co)
          })
  
          res(Promise.all(promises))
        } else {
          res(true)
        }
      });
    })
  }
}

module.exports = DbDao