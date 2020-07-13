// const MongoClient = require('mongodb').MongoClient
const myurl = 'mongodb://localhost:27017/redBadgeServer';

// MongoClient.connect(myurl, (err, client) => {
//     if (err) return console.log(err)
//      module.exports = client
//     })
  

 

    
    const mongoose = require("mongoose");
    mongoose.connect(myurl)
    module.exports = mongoose.connection