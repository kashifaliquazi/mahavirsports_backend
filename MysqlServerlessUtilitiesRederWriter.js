'use strict';
let FormHandling = require('/opt/commonutilities/FormHandling');
let keyList = ['cfgformat', 'platformsupport', 'credential', 'gwcredential', 'transactionmodesupport', 'itemlist', 'paramstrings', 'country', 'countrylist', 'exclusionlist', 'objectlist', 'subscriberlist', 'availabilityset', 'subgenre', 'tags', 'contentlanguage', 'drmscheme', 'packagedfilelist', 'filelist', 'devicetypelist', 'regionlist', 'details', 'paymentoptions'];
const RedisUtils = require('/opt/commonutilities/RedisUtilities');

const mysqlErrorCodes = function (errorcode) {
  let errorlist = {};
  errorlist['7101'] = 'Mysql Connection Failed';
  errorlist['7102'] = 'Mysql Pool Failed';
  errorlist['7103'] = 'Mysql Change DB Failed';
  errorlist['7104'] = 'Mysql Pool Exception';
  errorlist['7105'] = 'Mysql Insert Failed';
  errorlist['7106'] = 'Mysql Update Failed';
  errorlist['7107'] = 'Mysql Select Failed';
  errorlist['7108'] = 'Mysql Execute Failed';
  errorlist['7109'] = 'No Such Contents Found';
  errorlist['7110'] = 'Transaction failed';
  return FormHandling.formatErrorCode(errorcode, errorlist);
};

var ServerlessMysqlQueryHandler = async (queryString, query, type = 'reader') => {
  try {
    let mysqlconnpool = await getConnectionPool(queryString, type);
    console.log('ServerlessMysqlQueryHandler:gotConnection');
    let QueryResults = await mysqlconnpool.query(query);
    console.log('ServerlessMysqlQueryHandler:queryExecuted');
    await mysqlconnpool.quit();
    console.log('ServerlessMysqlQueryHandler:QueryResults', QueryResults);
    return QueryResults;
  }
  catch (error) {
    let errorData = mysqlErrorCodes(7107);
    errorData.reason = error.sqlMessage;
    console.log('ServerlessMysqlQueryHandler:Exception', errorData, error);
    return errorData;
  }
};

var selectAllMysqlQuery = function (queryString, query, callback) {
  console.log('selectAllServerlessMysqlQuery:Query', query);
  ServerlessMysqlQueryHandler(queryString, query).then(function (ResultData) {
    console.log('selectAllMysqlQuery:ResultData', ResultData);
    let ResultDataCount = ResultData.length;
    console.log('selectAllServerlessMysqlQuery:ResultDataCount', ResultDataCount);
    if (ResultDataCount < 1) { return callback(mysqlErrorCodes(7109)); }
    let finalData = {};
    finalData.totalcount = ResultDataCount;
    finalData.data = ResultData;
    finalData = FormHandling.simplifyListHandler(finalData, keyList);
    return callback(finalData.data);
  });
};

var getQueryTotalCount = function (queryString, query, CurrentDataCount, pageSize, callback) {
  ServerlessMysqlQueryHandler(queryString, query).then(function (ResultData) {
    let ResultDataCount = ResultData.length;
    console.log('getQueryTotalSererlessCount:ResultDataCount', ResultDataCount);
    return callback(ResultDataCount);
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

var listMysqlQueryLatest = function (queryString, query, countQuery, callback) {
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

var listMysqlQuery = function (queryString, query, filterData, callback) {
  let page = filterData['page'] || 1;
  let pageSize = filterData['pagesize'] || 15;
  let mysqlLimit = ((page - 1) * pageSize);
  let pagination = ' LIMIT ' + mysqlLimit + ',' + pageSize;
  let querywithpagination = query + pagination;
  console.log('listServerlessMysqlQuery:querywithpagination', querywithpagination);

  selectAllMysqlQuery(queryString, querywithpagination, function (resultData) {
    if (resultData.errorcode) { return callback(resultData); }
    let CurrentDataCount = resultData.length;
    getQueryTotalCount(queryString, query, CurrentDataCount, pageSize, function (totalCount) {
      let finalData = {};
      finalData.totalcount = totalCount;
      finalData.data = resultData;
      return callback(finalData);
    });
  });
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

var executeMysqlQuery = function (queryString, query, primaryKeyId, callback) {
  console.log('executeMysqlServerlessQuery:query', primaryKeyId, query);
  ServerlessMysqlQueryHandler(queryString, query, 'writer').then(function (ResultData) {
    if(ResultData.errorcode){return callback(ResultData);}
    console.log('executeMysqlServerlessQuery:ResultData', ResultData);
    if (ResultData.affectedRows === 0) { let errorData = mysqlErrorCodes(7108); errorData.reason = 'Invalid ' + primaryKeyId; return callback(errorData); }
    if (ResultData.insertId) { primaryKeyId = ResultData.insertId; }
    let finalResponse = { 'success': primaryKeyId };
    return callback(finalResponse);
  });
};

var getMysqlPoolTransactionClient = async (queryString, callback) => {
  try {
    let mysqlconnpool = await getConnectionPool(queryString, 'writer');
    await mysqlconnpool.connect();
    // Get the connection object
    let connection = mysqlconnpool.getClient();
    queryString.mysqltranscon = connection;
    return callback(connection);
  } catch (error) {
    console.log('Serverless::getMysqlPoolTransaction::Error', error);
    let errorData = mysqlErrorCodes(7104); errorData.reason = error.sqlMessage || errorData.reason;
    return callback(errorData);
  }
};


var transactionMysqlQuery = function(queryString, query, primaryKeyId, callback) {
  console.log('transactionMysqlQuery:query',query);
  queryString.mysqltranscon.query(query, function (error, results) {
      if(error)
      {
          console.log('transactionMysqlQuery:error',error);
          let errorData = mysqlErrorCodes(7108);
          errorData.reason = error.sqlMessage;
          return callback(errorData);
      }
      else if(results.affectedRows === 0)
      {
          console.log('transactionMysqlQuery:affectedRows',results);
          let errorData = mysqlErrorCodes(7110);
          errorData.reason = 'No Change';
          return callback(errorData);
      }
      else
      {
          console.log('transactionMysqlQuery:results',results);
          if(!primaryKeyId){primaryKeyId = results.insertId;}
          return callback({'success' : primaryKeyId});
      }
  });
};

var getMysqlPoolTransaction = async (queryString, callback) => {
  try {
    let mysqlconnpool = await getConnectionPool(queryString, 'writer');
    let transaction = await mysqlconnpool.transaction();
    transaction.quit = () => { return; }
    queryString.mysqltranscon = transaction;
    return callback(transaction);
  } catch (error) {
    console.log('Serverless::getMysqlPoolTransaction::Error', error);
    let errorData = mysqlErrorCodes(7104); errorData.reason = error.sqlMessage || errorData.reason;
    return callback(errorData);
  }
};

let transactionResponse = async (queryString, response, callback) => {
  try {
    if (response.errorcode) {
      await queryString.mysqltranscon.rollback();
    } else {
      await queryString.mysqltranscon.commit();
    }
    return callback(response);
  } catch (error) {
    response = mysqlErrorCodes(7110);
    console.log('Serverless::transactionResponse::Error', error);
    response.reason = error.sqlMessage || errorData.reason;
    return callback(response);
  };
};

var transacExecuteMysqlQuery = async (queryString, query, primaryKeyId, callback) => {
  try {
    console.log('executeMysqlServerlessQuery:query', primaryKeyId, query);
    let QueryResults = await queryString.mysqltranscon.query(query);
    return callback(QueryResults);
  }
  catch (error) {
    let errorData = mysqlErrorCodes(7107);
    errorData.reason = error.sqlMessage;
    console.log('ServerlessMysqlQueryHandler:Exception', errorData, error);
    return callback(errorData);
  }
};
let getConnectionPool = (queryString, type = 'reader') => {
  return new Promise((resolve) => {
    console.log('typetypetype==>connection====>',type);
    if (type === 'reader') {
      if (!queryString.mysqlconnpool) {
        queryString.mysqlconnpool = require('/opt/config/MysqlServerlessReader');
      }
      return resolve(queryString.mysqlconnpool);
    } else if(type === 'writer') {
      if (!queryString.mysqlconnpoolWriter) {
        queryString.mysqlconnpoolWriter = require('/opt/config/MysqlServerless');
      }
      return resolve(queryString.mysqlconnpoolWriter);
    }
  });
};
module.exports = {
  selectAllMysqlQuery: selectAllMysqlQuery,
  listMysqlQuery: listMysqlQuery,
  selectMysqlQuery: selectMysqlQuery,
  executeMysqlQuery: executeMysqlQuery,
  listMysqlQueryLatest: listMysqlQueryLatest,
  getMysqlPoolTransaction: getMysqlPoolTransaction,
  transactionResponse,
  transacExecuteMysqlQuery,
  getConnectionPool,
  getMysqlPoolTransactionClient,
  transactionMysqlQuery
};