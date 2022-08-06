var express = require('express');
var router = express.Router();
var getConnection = require("../config/db").getConnection;

// const mysql = require('serverless-mysql')({
//   config: {
//     host     : "localhost",//process.env.ENDPOINT,
//    // database : process.env.DATABASE,
//     user     :"root",// process.env.USERNAME,
//     password : "yash.jain#123"// process.env.PASSWORD
//   }
// })
router.get('/test',async (req, res, next)=> {
  console.log("Express test to test the Endpont 111111111111",req.url)
  let mysql =await getConnection();
  let results = await mysql.query('show databases;')
  await mysql.end();
 console.log("results>>",results)
/ res.send({ title: 'Express test' });
});
/* GET home page. */
router.post('/asd', function(req, res, next) {
  console.log("Express test to test the Endpont 111111111111",req.url)

  req.url ='/new2';
  req.testData= "kashif";
  next();
  res.send({ title: 'Express test' });
});

router.post('/new2', function(req, res, next) {
  console.log("Express test to test the Endpont 222222222")
 // next();
  res.send({ title: 'Express test new2'+req.testData });
});

router.post('/asd', function(req, res, next) {
  console.log("Express test to test the Endpont 3333333333")
  res.send({ title: 'Express test eew' });
});


module.exports = router;
