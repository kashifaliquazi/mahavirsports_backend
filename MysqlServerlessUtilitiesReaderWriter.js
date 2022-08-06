'use strict';
let FormHandling = require('/opt/commonutilities/FormHandling');
let keyList = ['cfgformat', 'platformsupport', 'credential', 'gwcredential', 'transactionmodesupport', 'itemlist', 'paramstrings', 'country', 'countrylist', 'exclusionlist', 'objectlist', 'subscriberlist', 'availabilityset', 'subgenre', 'tags', 'contentlanguage', 'drmscheme', 'packagedfilelist', 'filelist', 'devicetypelist', 'regionlist', 'details', 'paymentoptions'];
const RedisUtils = require('/opt/commonutilities/RedisUtilities');
const constants = require('/opt/config/constant');


const mysqlErrorCodes = function (errorcode) {
  let errorlist = {};
  errorlist['7101'] = 'Mysql Connection Failed';
  errorlist['7102'] = 'Mysql Pool Failed';
  errorlist['7103'] = 'Mysql Change DB Failed';
  errorlist['7104'] = 'Mysql Pool Exception';
  errorlist['7105'] = 'Mysql Insert Failed';
  errorlist['7106'] = 'Mysql Execute Failed';
  errorlist['7107'] = 'Mysql Select Failed';
  errorlist['7108'] = 'No record got affected';
  errorlist['7109'] = 'No Such Contents Found';
  errorlist['7110'] = 'Transaction failed';
  errorlist['7111'] = 'Begin transaction failed';
  errorlist['7112'] = 'Error in ending connection';
  errorlist['7113'] = 'Transaction not found';
  errorlist['7114'] = 'Duplicate Entry';
  return FormHandling.formatErrorCode(errorcode, errorlist);
};

let getConnectionPool = (queryString, type = 'reader') => {
  return new Promise((resolve) => {
    console.log('typetypetype==>connection====>', type);
    if (!queryString.dbCons) { queryString.dbCons = {}; }
    if (type === 'reader') {
      if (!queryString.dbCons.reader) {
        queryString.dbCons.reader = require('/opt/config/MysqlServerlessReader');
      }
      return resolve(queryString.dbCons.reader);
    } else if (type === 'writer') {
      if (!queryString.dbCons.writer) {
        queryString.dbCons.writer = require('/opt/config/MysqlServerless');
      }
      return resolve(queryString.dbCons.writer);
    }
  });
};

let executeMysqlExplicit = (queryString,query,type) => {
  return new Promise((resolve,reject) => {
    if(!queryString.mysqlDbcons) {
      queryString.mysqlDbcons = {};
    }
    let connect = false;

    if(!queryString.mysqlDbcons[type]){
      var mysql = require('mysql');
      console.log('executeMysqlExplicit');

      let config = {
        host     : constants.vlive_db_host,
        user     : constants.vlive_db_username,
        password : constants.vlive_db_password
      };
      if(type === 'reader') {
        config.host = constants.vlive_db_host_reader
      }
      queryString.mysqlDbcons[type] = mysql.createConnection(config);
      queryString.mysqlDbcons[type].connect();
      connect = true;
    }
    if(constants.quitConnOnEnd !== 'true' && !connect) {
      queryString.mysqlDbcons[type].connect();
    }
  
    console.log('executeMysqlExplicit::connect');
    queryString.mysqlDbcons[type].query(query, function (error, results) {
      console.log('executeMysqlExplicit::result');
  
      if(error){
        console.log('executeMysqlExplicit::error');
        let errorData  = mysqlErrorCodes(7107);
        errorData.reason = error.sqlMessage || error.message || errorData.reason;
        console.log('executeMysqlExplicit:Exception', errorData, error);
        if (error.code === 'ER_DUP_ENTRY') {
          errorData = mysqlErrorCodes(7114);
        }
        return reject(errorData);
      }else{
        let resultData = results;
        let resultDataCount = resultData.length;
        if(resultDataCount < 1){let errorData = mysqlErrorCodes(7109);return reject(errorData);}
        let finalData = {};
        finalData.totalcount = resultDataCount;
        finalData.data = resultData;
        finalData = FormHandling.simplifyListHandler(finalData, keyList);           
        return resolve(finalData.data);
      }
    });
      
    console.log('executeMysqlExplicit::',constants.quitConnOnEnd);
    if(constants.quitConnOnEnd !== 'true') {
      console.log('executeMysqlExplicit::ending');
      queryString.mysqlDbcons[type].end();
    }
  });
}
var ServerlessMysqlQueryHandler = async (queryString, query, type = 'reader') => {
  try {
    if(queryString.mysqlDbcons){
      throw {errorcode: 9999, reason:'Retry With Fresh Connection'};
    }
    let mysqlconnpool = await getConnectionPool(queryString, type);
    let QueryResults = await mysqlconnpool.query(query);
    if(constants.quitConnOnEnd !== 'true') {
      await mysqlconnpool.quit();
    }
    return QueryResults;
  }
  catch (error) {
    if(error.errorcode === 9999){
      try{
        let result = await executeMysqlExplicit(queryString, query, type);
        return result;
      }  catch (error) {
        let errorData = error;
        if(!error.errorcode) {
          errorData  = mysqlErrorCodes(7107);
          errorData.reason = error.sqlMessage || error.message || errorData.reason;
          console.log('ServerlessMysqlQueryHandler:Exception', errorData, error);
          if (error.code === 'ER_DUP_ENTRY') {
            errorData = mysqlErrorCodes(7114);
          }
        }
        return errorData;
      }
    }else {
      let errorData = mysqlErrorCodes(7107);
      errorData.reason = error.sqlMessage || error.message || errorData.reason;
      console.log('ServerlessMysqlQueryHandler:Exception', errorData, error);
      if (error.code === 'ER_DUP_ENTRY') {
        errorData = mysqlErrorCodes(7114);
      }
      return errorData;
    }
  }
};

var selectAllMysqlQuery = function (queryString, query, callback) {
  console.log('selectAllServerlessMysqlQuery:Query', query);
  try {
    ServerlessMysqlQueryHandler(queryString, query).then(function (ResultData) {
      if (ResultData.errorcode) { return callback(ResultData); }
      let ResultDataCount = ResultData.length;
      console.log('selectAllServerlessMysqlQuery:ResultDataCount', ResultDataCount);
      if (ResultDataCount < 1) { return callback(mysqlErrorCodes(7109)); }
      let finalData = {};
      finalData.totalcount = ResultDataCount;
      finalData.data = ResultData;
      finalData = FormHandling.simplifyListHandler(finalData, keyList);
      return callback(finalData.data);
    });
  } catch (error) {
    let errorData = mysqlErrorCodes(7107);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    console.log('ServerlessMysqlQueryHandler:Exception', errorData, error);
    return callback(errorData);
  }
};

var selectMysqlQuery = function (queryString, query, callback) {
  query = query.trim();
  while (query.endsWith(';')) { query = query.substr(0, query.length - 1); }
  let temp = query.substr(query.length - 15).toUpperCase();
  if (temp.search('LIMIT') === -1) {
    query += ' LIMIT 0,1';
  }
  selectAllMysqlQuery(queryString, query, function (resultData) {
    if (resultData.errorcode) { return callback(resultData); }
    return callback(resultData[0]);
  });
};

var getQueryTotalCountNew = function (queryString, query, callback) {
  let totalCount = 0;
  selectMysqlQuery(queryString, query, (result) => {
    if (result.errorcode) { return callback(result); }
    else {
      if (result.count) totalCount = result.count;
      return callback(totalCount);
    }
  });
};

var getQueryTotalCountCachNew = function (queryString, query, callback) {
  const crypto = require('crypto');
  let shasum = crypto.createHash('sha1');
  shasum.update(query);
  let queryHash = shasum.digest('hex');
  let redisKey = `COUNTQUERY::HASH::${queryHash}::PROVIDERID::${queryString.providerid}`;
  RedisUtils.getRedisKey(queryString.redisClient, redisKey, (redisdata) => {
    if (redisdata.errorcode) {
      getQueryTotalCountNew(queryString, query, (totalCount) => {
        if (totalCount.errorcode) { return callback(totalCount); }
        RedisUtils.setRedisKeyExpiry(queryString.redisClient, redisKey, JSON.stringify(totalCount), 600, (redisdata) => {
          if (redisdata.errorcode) return callback(redisdata);
          return callback(totalCount);
        });
      });
    } else {
      return callback(FormHandling.convertStringToJson(redisdata));
    }
  });
};

var listMysqlQuery = function (queryString, query, countQuery, callback) {
  let page = parseInt(queryString['page']) || 1;
  let pageSize = parseInt(queryString['pagesize']) || 15;
  if (pageSize > 100) { pageSize = 100; }
  let mysqlLimit = ((page - 1) * pageSize);
  let pagination = ' LIMIT ' + mysqlLimit + ',' + pageSize;
  let querywithpagination = query + pagination;
  console.log('listMysqlQuery::countQuery', countQuery);

  selectAllMysqlQuery(queryString, querywithpagination, function (resultData) {
    if (resultData.errorcode) { return callback(resultData); }
    let finalData = {};
    finalData.totalcount = 0;
    finalData.data = resultData;
    if (page === 1 && resultData.length < pageSize) {
      finalData.totalcount = resultData.length;
      return callback(finalData);
    }
    getQueryTotalCountCachNew(queryString, countQuery, function (totalCount) {
      if (totalCount.errorcode) return callback(totalCount);
      finalData.totalcount = totalCount;
      return callback(finalData);
    });
  });
};

var executeMysqlQuery = function (queryString, query, primaryKeyId, callback) {
  console.log('executeMysqlServerlessQuery:query', primaryKeyId, query);
  try {
    ServerlessMysqlQueryHandler(queryString, query, 'writer').then(function (ResultData) {
      if (ResultData.errorcode) {
        if (ResultData.errorcode === 7114) {
          ResultData.reason = primaryKeyId + ' Already Exist';
        }
        return callback(ResultData);
      }
      console.log('executeMysqlServerlessQuery:ResultData', ResultData);
      if (ResultData.affectedRows === 0) { let errorData = mysqlErrorCodes(7108); errorData.reason = 'Invalid ' + primaryKeyId; return callback(errorData); }
      if (ResultData.insertId) { primaryKeyId = ResultData.insertId; }
      let finalResponse = { 'success': primaryKeyId };
      return callback(finalResponse);
    });
  } catch (error) {
    let errorData = mysqlErrorCodes(7106);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    console.log('Serverless::executeMysqlQuery:Exception', errorData, error);
    return callback(errorData);
  }
};

//transac with client
var getMysqlPoolConnection = async (queryString, callback) => {
  try {
    let mysqlconnpool = await getConnectionPool(queryString, 'writer');
    await mysqlconnpool.connect();

    // Get the connection object
    let connection = mysqlconnpool.getClient();
    queryString.dbCons.transconn = connection;

    return callback(connection);
  } catch (error) {
    console.log('Serverless::getMysqlPoolTransaction::Error', error);
    let errorData = mysqlErrorCodes(7101);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    return callback(errorData);
  }
};

var getMysqlTransacConn = function (queryString, callback) {
  try {
    getMysqlPoolConnection(queryString, (mysqlconn) => {
      if (mysqlconn.errorcode) { return callback(mysqlconn); }
      mysqlconn.beginTransaction(function (error) {
        if (error) {
          console.log('getMysqlTransacConn::beginTransaction::Error', error,mysqlconn);
          let errorData = mysqlErrorCodes(7111);
          errorData.reason = error.sqlMessage || error.message || errorData.reason;
          return callback(errorData);
        }
        queryString.dbCons.transconn = mysqlconn;
        return callback(mysqlconn);
      });
    });
  } catch (error) {
    console.log('getMysqlTransacConn::exception', error);
    let errorData = mysqlErrorCodes(7104);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    return callback(errorData);
  }
};

var transactionMysqlQuery = function (queryString, query, primaryKeyId, callback) {
  if (!queryString.dbCons || !queryString.dbCons.transconn) { return callback(mysqlErrorCodes(7113)); }
  console.log('transactionMysqlQuery:query', query);
  try {
    queryString.dbCons.transconn.query(query, function (error, results) {
      if (error) {
        console.log('transactionMysqlQuery:error', error);
        let errorData = mysqlErrorCodes(7106);
        errorData.reason = error.sqlMessage || error.message || errorData.reason;
        if (error.code === 'ER_DUP_ENTRY') {
          errorData = mysqlErrorCodes(7114);
          errorData.reason = primaryKeyId + ' Already Exist';
        }
        return callback(errorData);
      }
      else if (results.affectedRows === 0) {
        console.log('transactionMysqlQuery:affectedRows', results);
        let errorData = mysqlErrorCodes(7108);
        errorData.reason = 'No Change';
        return callback(errorData);
      }
      else {
        console.log('transactionMysqlQuery:results', results);
        if (!primaryKeyId) { primaryKeyId = results.insertId; }
        return callback({ 'success': primaryKeyId });
      }
    });
  } catch (error) {
    console.log('transactionMysqlQuery::exception', error);
    let errorData = mysqlErrorCodes(7106);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    return callback(errorData);
  }
};

var transSelectAllMysqlQuery = function (queryString, query, callback) {
  if (!queryString.dbCons || !queryString.dbCons.transconn) { return callback(mysqlErrorCodes(7113)); }
  try {
    console.log('transSelectAllMysqlQuery:query', query);
    queryString.dbCons.transconn.query(query, function (error, results) {
      if (error) {
        console.log('transSelectAllMysqlQuery:error', error);
        let errorData = mysqlErrorCodes(7107);
        errorData.reason = error.sqlMessage || error.message || errorData.reason;
        return callback(errorData);
      } else {
        let resultData = results;
        let resultDataCount = resultData.length;
        if (resultDataCount < 1) { let errorData = mysqlErrorCodes(7109); return callback(errorData); }
        let finalData = {};
        finalData.totalcount = resultDataCount;
        finalData.data = resultData;
        finalData = FormHandling.simplifyListHandler(finalData, keyList);
        return callback(finalData.data);
      }
    });
  } catch (error) {
    console.log('transactionMysqlQuery::exception', error);
    let errorData = mysqlErrorCodes(7107);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    return callback(errorData);
  }
};

var transSelectMysqlQuery = function (queryString, query, callback) {
  if (!queryString.dbCons || !queryString.dbCons.transconn) { return callback(mysqlErrorCodes(7113)); }
  console.log('transSelectMysqlQuery:query', query);
  query = query.trim();

  while (query.endsWith(';')) { query = query.substr(0, query.length - 1); }

  let temp = query.substr(query.length - 15).toUpperCase();
  if (temp.search('LIMIT') === -1) {
    query += ' LIMIT 0,1';
  }

  transSelectAllMysqlQuery(queryString, query, function (resultData) {
    if (resultData.errorcode) { return callback(resultData); }
    return callback(resultData[0]);
  });
};

let endTransactionConn = (queryString, data, callback) => {
  if (!queryString.dbCons || !queryString.dbCons.transconn) {
    if (data.errorcode) { return callback(data); }
    return callback(mysqlErrorCodes(7113));
  }
  try {
    let connection = queryString.dbCons.transconn;
    if (!data.errorcode) {
      connection.commit(function (error) {
        if (error) {
          connection.rollback(function () {
            console.log('endTransactionConn::error', error);
            let errorData = mysqlErrorCodes(7110);
            errorData.reason = error.sqlMessage || error.message || errorData.reason;
            return callback(errorData);
          });
        } else {
          //Success
          return callback(data);
        }
      });
    } else {
      connection.rollback(function () {
        return callback(data);
      });
    }
  } catch (error) {
    console.log('endTransactionConn::exception', error);
    let errorData = mysqlErrorCodes(7110);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    return callback(errorData);
  }
};

//transac without client
var getMysqlPoolTransaction = async (queryString, callback) => {
  try {
    let mysqlconnpool = await getConnectionPool(queryString, 'writer');
    let transaction = await mysqlconnpool.transaction();
    queryString.dbCons.transconSless = transaction;
    return callback(transaction);
  } catch (error) {
    console.log('Serverless::getMysqlPoolTransaction::Error', error);
    let errorData = mysqlErrorCodes(7104);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    return callback(errorData);
  }
};

let transactionResponse = async (queryString, response, callback) => {
  if (!queryString.dbCons || !queryString.dbCons.transconSless) { return callback(mysqlErrorCodes(7113)); }
  try {
    if (response.errorcode) {
      await queryString.dbCons.transconSless.rollback();
    } else {
      await queryString.dbCons.transconSless.commit();
    }
    return callback(response);
  } catch (error) {
    response = mysqlErrorCodes(7110);
    console.log('Serverless::transactionResponse::Error', error);
    response.reason = error.sqlMessage || error.message || response.reason;
    return callback(response);
  }
};

var transacExecuteMysqlQuery = async (queryString, query, primaryKeyId, callback) => {
  if (!queryString.dbCons || !queryString.dbCons.transconSless) { return callback(mysqlErrorCodes(7113)); }
  try {
    console.log('executeMysqlServerlessQuery:query', primaryKeyId, query);
    let QueryResults = await queryString.dbCons.transconSless.query(query);
    return callback(QueryResults);
  }
  catch (error) {
    let errorData = mysqlErrorCodes(7107);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    console.log('ServerlessMysqlQueryHandler:Exception', errorData, error);
    return callback(errorData);
  }
};

//end all db connections
let endConnectionPool = (queryString) => {
  return new Promise(async (resolve, reject) => {
    let error = false;
    if (queryString.dbCons && Object.keys(queryString.dbCons).length > 0) {
      console.log('conEndList ==>', Object.keys(queryString.dbCons));
      for (const thisKey in queryString.dbCons) {
        try {
          console.log('closingConn', thisKey);
          if (thisKey === 'transconn') { continue; }
          queryString.dbCons[thisKey].quit();
        } catch (err) {
          error = mysqlErrorCodes(7112);
          console.log('endConnection::iterator::', thisKey, err);
        }
      }
    }

    if (queryString.mysqlDbcons && Object.keys(queryString.mysqlDbcons).length > 0) {
      console.log('conExplicitEndList ==>', Object.keys(queryString.mysqlDbcons));
      for (const thisKey in queryString.mysqlDbcons) {
        try {
          console.log('closingExplicitConn', thisKey);
          if (thisKey === 'transconn') { continue; }
          queryString.mysqlDbcons[thisKey].end();
        } catch (err) {
          error = mysqlErrorCodes(7112);
          console.log('endConnection::iterator::', thisKey, err);
        }
      }
    }

    if (error) {
      return reject(error);
    }
    return resolve(queryString);
  });
};

var selectAllMysqlQueryReaderWriter = function (queryString, query, conntype = 'reader', callback) {
  console.log('selectAllMysqlQueryReaderWriter:Query', query);
  try {
    ServerlessMysqlQueryHandler(queryString, query, conntype).then(function (ResultData) {
      if (ResultData.errorcode) { return callback(ResultData); }
      let ResultDataCount = ResultData.length;
      console.log('selectAllMysqlQueryReaderWriter:ResultDataCount', ResultDataCount);
      if (ResultDataCount < 1) { return callback(mysqlErrorCodes(7109)); }
      let finalData = {};
      finalData.totalcount = ResultDataCount;
      finalData.data = ResultData;
      finalData = FormHandling.simplifyListHandler(finalData, keyList);
      return callback(finalData.data);
    });
  } catch (error) {
    let errorData = mysqlErrorCodes(7107);
    errorData.reason = error.sqlMessage || error.message || errorData.reason;
    console.log('selectAllMysqlQueryReaderWriter:Exception', errorData, error);
    return callback(errorData);
  }
};

var selectMysqlQueryReaderWriter = function (queryString, query, conntype = 'reader', callback) {
  query = query.trim();
  while (query.endsWith(';')) { query = query.substr(0, query.length - 1); }
  let temp = query.substr(query.length - 15).toUpperCase();
  if (temp.search('LIMIT') === -1) {
    query += ' LIMIT 0,1';
  }
  selectAllMysqlQueryReaderWriter(queryString, query, conntype, function (resultData) {
    if (resultData.errorcode) { return callback(resultData); }
    return callback(resultData[0]);
  });
};

module.exports = {
  selectAllMysqlQuery: selectAllMysqlQuery,
  selectMysqlQuery: selectMysqlQuery,
  selectMysqlQueryReaderWriter: selectMysqlQueryReaderWriter,
  listMysqlQuery: listMysqlQuery,
  listMysqlQueryLatest: listMysqlQuery,
  executeMysqlQuery: executeMysqlQuery,
  getMysqlPoolConnection,
  getMysqlTransacConn,
  transactionMysqlQuery,
  transSelectMysqlQuery,
  transSelectAllMysqlQuery,
  endTransactionConn,
  getMysqlPoolTransaction: getMysqlPoolTransaction,
  transactionResponse,
  transacExecuteMysqlQuery,
  getConnectionPool,
  endConnectionPool
};