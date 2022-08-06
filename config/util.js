var request = require('request');
// var PubNub = require('pubnub');
var CONSTANTS = require('./constants').CONSTANTS;

console.log("CONSTANTS >>>>>>>>>>>>>>>>>",CONSTANTS);
module.exports.categories = {
  132:"DayByDay",
  133:"PracticalSituation",
  134:"HealthAdvice",
  135:"Missing",//"Others",
  136:"Others",//"Missing",
  137:"Notification POC",
}


module.exports.eventMapping = {
  1:"Questionnaire",
  2:"InvolvedAndDoubtfulUsers",
  3:"AmbulanceAndHospitalInformation",
  4:"FAUInformation",
  5:"EmergencyUnitDetails",
  6:"NotesByPSAP",
}


module.exports.getBooleanValue =  function(s){
    if (typeof s === "boolean"){
        // variable is a boolean
        return s;
      }
      if(s == undefined)
      return false;
      if (typeof s === "number"){
        // variable is a boolean
        s = s.toString();
      }
    
      let valueDefault  = false;
      switch(s.toLowerCase())
      {
          case "true":
          case "1":
          case "on":
          case "yes":
          case "y":
              return true;
    
          case "false":
          case "0":
          case "off":
          case "no":
          case "n":
              return false;
      }
    
      return valueDefault;
  };

  
module.exports.decodeAccessToken = (accessToken) => {
  let token = accessToken.split(".");
  let decodedData = Buffer.from(token[1], 'base64').toString('ascii'); 
  let parsedUserDate = JSON.parse(decodedData);
  return parsedUserDate;
};

module.exports.parseMessageWithName = (name,message) => {

  let parsedMessage = message;
  parsedMessage = message.replace("{1}",name);
  return parsedMessage;
};
module.exports.getSuccessObject = (statusCode,message, result) => {
  let response = {
    response_code: statusCode,
    data:result,
    response_message: message,
    error: null
  };
return response;
};
  
  module.exports.getErrorObject = (statusCode,message, error) => {
    let response = {
        response_code: statusCode,
        response_message: message,
        error: error
      };
    return response;
  };

  module.exports.getErrorObjectWithLocalization = (statusCode,message, messageCode,error) => {
  let response = {
      response_code: statusCode,
      response_message: message,
      response_message_code:messageCode,
      error: error
    };
  return response;
};

  module.exports.getSuccessObjectWithLocalization = (statusCode,message, messageCode,result) => {
    let response = {
        response_code: statusCode,
        data:result,
        response_message: message,
        response_message_code:messageCode,
        error: null
      };
    return response;
  };
  
  module.exports.getNotificationMessageBasedOnUserId= (userId,message_code) =>{
    let url = `${CONSTANTS.laravelBaseUrl}${CONSTANTS.getNotificationMessage}?user_id=${userId}&message_code=${message_code}`;//`https://olaw8tct1a.execute-api.ap-south-1.amazonaws.com/dev/get_nearby_users_for_help?latitude=${lat}&longitude=${lng}`;
    console.log('Making call:',url);
    // console.log("phpLaravelRequest  >>> phpLaravelRequest",phpLaravelRequest)
    return new Promise((resolve, reject) => {
  
  
      var headers= {
        "x-api-key":''
        //'Authorization': authorization//'Bearer eyJraWQiOiJHaVFQdElSdU9RRUE4WStFQUFmblhQVlM2a1V4WmtVSjdmd0ljWU8rWmlnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NTg4OWIzMC1mMDQ1LTQ2N2ItOWExYy03NWQwZWY2ZjAyYzQiLCJhdWQiOiI3ZWVsdGNkaXR1cjc0NTRyMW1zYmkwMWE1NiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBhM2MxNjAyLTgyMTMtMTFlOS05YTc5LThiOTdlZjUwODE2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU5MTM1MzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9xMHF0NHAwZzMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzU4ODliMzAtZjA0NS00NjdiLTlhMWMtNzVkMGVmNmYwMmM0IiwiZXhwIjoxNTU5MTM4OTkwLCJpYXQiOjE1NTkxMzUzOTAsImVtYWlsIjoidmlwaW4xN0B5b3BtYWlsLmNvbSJ9.NdRKj7InE-pCnUdU5miyv6XbzlMnQAYW2OPUErUrt4Hl4K_6Rz_hOnvn8I6ABf-Ep2omT_2aEd60ZFnuJOMLyp_javFUAtyQPuOBrLrG6TvneuzO9GLHNOI08Ugna-w1D0JBmqseQJl-NF12hMJSs1_vgOp1SNpZx6MMDOJToxeSJEnrJ2SuUZDdR6vp4ef4c348atFqIJMfmgDf523jord0dbg_MezxZPa25XEueyRJM3koi-jFJ5mFFrj3rLOSm-nhPuCmr02Od0NjcbiWv0hJ9CHPdY-vrJPU44BEGqLQ3ans6LoWOfTZVJuMpb2JzoDmn8IshYVnto2w54WoBg'
       }
  
     
      request.get({url:url,headers:headers}, function optionalCallback(err, httpResponse, body) {
    if (err) {
       console.error('upload failed:'+err);
       reject(err);
    }
   // console.log('Upload successful!  Server responded with:',JSON.stringify(body));
    resolve(body);
  });
    });
  }


  module.exports.getErrorObjectForFAUModule = (statusCode,message, error) => {
    let response = [
      {
          "error": {
              "code":statusCode,
              "description": message
          }
      }
  ]
    return response;
  };

  module.exports.buildNotificationObject =(notification) =>{
    console.log("payload builder start ",notification);
    let notificationType = notification.notification_type!=undefined?notification.notification_type:"NORMAL";
    let payload = {
      channel : notification.channel_id,
  }
  //return payload;
    if(notificationType == "NORMAL"){
      payload.message = {  
          "pn_apns":{  
             "aps":{  
                "alert":notification.payload.message
             },
             "data":notification.payload,
                     "pn_push": [{
            "targets": [{
              "environment": CONSTANTS.iOSNotificationEnviroment,
              "topic":CONSTANTS.notificationTopic// "com.pikotechnologies.borisapp"
            }],
            "version": "v2"
          }]
          },
          "pn_gcm":{  
             "data":notification.payload
          }
       }
       
    }else if(notificationType == "SILENT"){
      payload.message = {  
        "pn_apns":{  
           "aps":{  
            "content-available":1
           },
           "data":notification.payload,
           "pn_push": [{
            "targets": [{
              "environment": CONSTANTS.iOSNotificationEnviroment,
              "topic":CONSTANTS.notificationTopic// "com.pikotechnologies.borisapp"
            }],
            "version": "v2"
          }]
        },
        "pn_gcm":{  
           "data":notification.payload
        }
     }
    }else if(notificationType == "REALTIME"){
      payload.message = notification.payload;
    }
    console.log("payload builder",payload)
  return payload;
  }

  let pubnubInstance = null;
  module.exports.getPubNubInstance = async () =>{
   if(pubnubInstance){
     console.log("reusing pubnubInstance in frequent calls");
   return pubnubInstance;
   }
   pubnubInstance = new PubNub({
    publishKey : CONSTANTS.pubnubPubKey,//'pub-c-fa46642a-27d9-4b6a-acd0-769ba7cbbf27',
    subscribeKey :CONSTANTS.pubnubSubKey// 'sub-c-6df0e164-dcf8-11e8-abf2-1e598b800e69'
})
return pubnubInstance;

  }

  module.exports.sendNotification = async (payload)=>{
    console.log("sending Notification from PUBNUB",JSON.stringify(payload));
    const client =await getPubNubInstance();
   // console.log("Sending Notification",channelId);
    return new Promise((resolve, reject) => {
 
    console.log("payload",payload);
    client.publish(payload, function(status, response) {
        console.log("pubnun response",response);
        resolve({ response: response });
    })
  
    });
  }