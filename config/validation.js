const { CONSTANTS } = require("../config/constants")
var jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) =>{
  // Get auth header value
  try{
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;

    // Next middleware
    var decoded = jwt.verify(bearerToken, CONSTANTS.SECRET_KEY);
    req.userData = decoded;
    next();
  } else {
    // Forbidden
    res.status(403).json({"errorCode":400,"reason":"Access Token is Required."});
  }
}catch(ex){
  res.status(401).json({"errorCode":400,"reason":"Invalid Access token"});
}
}