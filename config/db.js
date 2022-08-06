const { CONSTANTS } = require('./constants');




let db_config = {};
db_config.host = "mahavirsports-db.cdzj5mvaumif.ap-south-1.rds.amazonaws.com",//"mahavirsports-db.cdzj5mvaumif.ap-south-1.rds.amazonaws.com";
db_config.user = "admin",// "admin";
db_config.password = "yash.jain#123";
db_config.connectionLimit = 2;
db_config.multipleStatements = true;
console.log('MysqlServerlessReader:db_config',db_config);

let mysqlconnpool = require('serverless-mysql')({backoff:'decorrelated',base:5,cap:200,config:db_config,
onError:(err)=>{
console.log('mysqlconnpool_onError ',err);
},
onKillError:(err)=>{
    console.log('mysqlconnpool_onKillError ',err);
},
onConnectError:(err)=>{
    console.log('mysqlconnpool_onConnectError ',err);
},
onConnect:()=>{
    console.log('mysqlconnpool_connected');
},
onRetry: (err,retries,delay,type) => { 
    console.log('onRetry_err ',err);
    console.log('onRetry_retries ',retries);
    console.log('onRetry_delay ',delay);
    //Instead of retrying with existing connection we will retry with fresh connection
    // this needs to be handled where we are executing the query i.e. on 'mysqlconnpool.query()'
    // /throw {errorcode: 9999, reason:'Retry With Fresh Connection'}
}});



module.exports.getConnection = async () =>{
  return new Promise((resolve) => {
    return resolve(mysqlconnpool);
  });
}
