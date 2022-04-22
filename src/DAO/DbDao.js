const { MongoClient, Db } = require('mongodb');
const url = 'mongodb://root:password@localhost:27017/';

class DbDao {
  collections = ['users', 'orders']

  constructor(name = 'dockerdb') {
    this.name = name
  }

  connectDB() {
    return new Promise((res, rej) => {
      try {
        MongoClient.connect(url, async (err, db) => {
          if (err) throw err;
          this.db = db;
          this.dbo = db.db(this.name);
          
          res(true)
        });
      } catch (err) {
        rej(err)
      }
    })
  }

  closeConn() {
    this.db.close();
  }

  initConn() {
    return new Promise((res, rej) => {
      try {
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
            })
    
            res(Promise.all(promises))
          } else {
            res(true)
          }
        });
      } catch (err) {
        rej(err)
      }
    })
  }

  get(collection) {
    return this.dbo.collection(collection).find().toArray()
  }

  post(collection, newItem) {
    return this.dbo.collection(collection).insertOne(newItem)
  }
}

module.exports = DbDao