'esversion:6';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const router = express.Router();
// Connection URL
let port = 3000;
// const url = 'mongodb://localhost';
const app = express();
// const mongoose = require('mongoose');
// mongoose.connect(url, function (err){
//   if (err) throw err;
//   console.log('Successfully connected');
// });

// Database Name
const dbName = 'myproject';
 
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('students');
    // Insert some documents
    collection.insertMany([
         {id : 1, firstName: 'John', lastName: 'Doe', age: 24, nationality: 'English'},
         {id : 2, firstName: 'Jan', lastName: 'Dewaele', age: 27, nationality: 'Belgian'},
         {id : 3, firstName: 'Jonathan', lastName: 'Van Driessen', age: 33, nationality: 'Belgian'},
         {id: 4, firstName: 'Anthony', lastName: 'Lamot', age:30, nationality: 'Belgian'},
         {id: 5, firstName: 'Tim', lastName: 'Ferris', age: 36, nationality: 'American'},
         {id: 6, firstName: 'Melinda', lastName: 'Gates', age: 63, nationality: 'American'},
         {id: 7, firstName: 'Jan', lastName: 'De Hollander', age: 13, nationality: 'Dutch'},
         {id: 8, firstName: 'Maarten', lastName: 'De Vriendt', age: 47, nationality: 'Dutch'},
         {id: 9, firstName: 'Furkan', lastName: 'Kursun', age: 23, nationality: 'Turkish'}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(9, result.result.n);
        assert.equal(9, result.ops.length);
        console.log("Inserted 9 documents into the collection");
        callback(result);
      });
}


  function initializeData() {

    MongoClient.connect('mongodb://localhost', function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
   
      const db = client.db(dbName);
      insertDocuments(db, function() {
      client.close();
      
      });
    }
    ); 
  }

app.use('/about', function (req, res) {
  res.send('About this project');
});

app.use('/init', initializeData);

app.listen(port, function() {
  console.log('Server is up and running on port numner ' + port);
});


