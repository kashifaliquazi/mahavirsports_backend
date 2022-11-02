const AWS = require("aws-sdk");
//  require("dotenv").config();//npm install dotenv



// Tried with and without this. Since s3 is not region-specific, I don't
// think it should be necessary.
// AWS.config.update({region: 'us-west-2'})


function sendOTP(){
  var mobileNo = "+919098580784";
  var OTP = 123;
  
  var params = {
  Message: "test message", /* required */
    PhoneNumber: mobileNo,
    };
    return new AWS.SNS({apiVersion: '2010–03–31'}).publish(params).promise()
.then(message => {
console.log("message",message)
})
.catch(err => {
  console.log("err",err)
return err;});
}
//sendOTP();//calling send otp function

function generateSingedURL(file){
  const s3 = new AWS.S3()
AWS.config.update({accessKeyId: 'AKIAS4XJJTLSOPVUREVW', secretAccessKey: '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'})

  const myBucket = 'mahavirsportsdata';
const myKey =file;
const signedUrlExpireSeconds = 60 * 5

const url = s3.getSignedUrl('putObject', {
    Bucket: myBucket,
    Key: myKey,
    ACL:"public-read",
    Expires: signedUrlExpireSeconds
});
return url;
}

  module.exports.sendOTP = sendOTP;
  module.exports.generateSingedURL = generateSingedURL;
