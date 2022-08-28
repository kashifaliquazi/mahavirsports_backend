var userModel = require("../models/user.model");
const { CONSTANTS } = require("../config/constants")
var jwt = require('jsonwebtoken');




const moment = require('moment');

const userController = {};


userController.login= async (body)=>{
    try {
        console.log("userController.login:body ",body);
        let user = await userModel.login(body);
        console.log("userController.login:user ",user.userid);
        let result ={
            "userid": user.userid,
            "name": user.name,
            "mobileno": user.mobileno,
            "role": user.role,
        };
        if( user.status!= "ACTIVE")
        throw {"errorCode":400,"reason":"Please verify your account first"};
        var token = jwt.sign( result, CONSTANTS.SECRET_KEY);
        result.token = token;
        console.log("userController.login:token ",token);
        return result;
        }catch(ex){
        throw ex;
        }
}

userController.signup= async (body)=>{
    try {
        console.log("userController.login:body ",body);
        let user = await userModel.signup(body);
        console.log("userController.signup:user ",user);
        // We need to send OTP to Mobile number

        return {"message":`We have send an OTP to ${body.mobileno}. Please verify`};
        }catch(ex){
        throw ex;
        }
}

userController.verify= async (body)=>{
    try {
        console.log("userController.login:body ",body);
        let user = await userModel.verify(body);
        console.log("userController.signup:user ",user);
        // We need to send OTP to Mobile number

        return {"message":`Verification done! Please login`};
        }catch(ex){
        throw ex;
        }
}


userController.updatePassword= async (body)=>{
    try {
        console.log("userController.login:body ",body);
        let user = await userModel.updatePassword(body);
        console.log("userController.signup:user ",user);
        // We need to send OTP to Mobile number

        return {"message":`Password Has been updated`};
        }catch(ex){
        throw ex;
        }
}
userController.getPurchases= async (body)=>{
    try {
        console.log("userController.getPurchases:body ",body);
        let purchases = await userModel.getPurchases(body);
        return purchases;
        }catch(ex){
        throw ex;
        }
}


userController.getTickets= async (body)=>{
    try {
        console.log("userController.getTickets:body ",body);
        let tickets = await userModel.getTickets(body);
        return tickets;
        }catch(ex){
        throw ex;
        }
}

userController.createTicket= async (body)=>{
    try {
        console.log("userController.getPurchases:body ",body);
        let purchases = await userModel.createTicket(body);
        return {"message":`Ticket has been created`};;
        }catch(ex){
        throw ex;
        }
}

// function createDisappearanceNotification(event_detail){
//   let body ={"event_detail":event_detail}

//   console.log("event_detail",JSON.stringify(event_detail));
//   var headers= {
//     "Content-Type":"application/json"//'Bearer eyJraWQiOiJHaVFQdElSdU9RRUE4WStFQUFmblhQVlM2a1V4WmtVSjdmd0ljWU8rWmlnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NTg4OWIzMC1mMDQ1LTQ2N2ItOWExYy03NWQwZWY2ZjAyYzQiLCJhdWQiOiI3ZWVsdGNkaXR1cjc0NTRyMW1zYmkwMWE1NiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBhM2MxNjAyLTgyMTMtMTFlOS05YTc5LThiOTdlZjUwODE2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU5MTM1MzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9xMHF0NHAwZzMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzU4ODliMzAtZjA0NS00NjdiLTlhMWMtNzVkMGVmNmYwMmM0IiwiZXhwIjoxNTU5MTM4OTkwLCJpYXQiOjE1NTkxMzUzOTAsImVtYWlsIjoidmlwaW4xN0B5b3BtYWlsLmNvbSJ9.NdRKj7InE-pCnUdU5miyv6XbzlMnQAYW2OPUErUrt4Hl4K_6Rz_hOnvn8I6ABf-Ep2omT_2aEd60ZFnuJOMLyp_javFUAtyQPuOBrLrG6TvneuzO9GLHNOI08Ugna-w1D0JBmqseQJl-NF12hMJSs1_vgOp1SNpZx6MMDOJToxeSJEnrJ2SuUZDdR6vp4ef4c348atFqIJMfmgDf523jord0dbg_MezxZPa25XEueyRJM3koi-jFJ5mFFrj3rLOSm-nhPuCmr02Od0NjcbiWv0hJ9CHPdY-vrJPU44BEGqLQ3ans6LoWOfTZVJuMpb2JzoDmn8IshYVnto2w54WoBg'
//    }
//   let url =CONSTANTS.notificationServiceBaseUrl +CONSTANTS.createDisappearanceNotification;
//   console.log("URL  <<<<<<<<<<<<<<<<<<<<<<<<<< URL <<<<<<",url);
//   return new Promise((resolve, reject) => {
//   request.post({url:url,headers:headers, json: body}, function optionalCallback(err, httpResponse, body) {
//     if (err) {
//        console.error('upload failed:'+err);
//        reject(err);
//     }
//     console.log('Upload successful!  Server responded with:',body);
//     resolve(body);
//   });
// });
// }

// function setEventIdinDisappearanceNotification(eventId,notificationId){
//   let body ={
//     "eventId":eventId,
//   "notificationId":notificationId}

//   console.log("event_detail",JSON.stringify(body));
//   var headers= {
//     "Content-Type":"application/json"//'Bearer eyJraWQiOiJHaVFQdElSdU9RRUE4WStFQUFmblhQVlM2a1V4WmtVSjdmd0ljWU8rWmlnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NTg4OWIzMC1mMDQ1LTQ2N2ItOWExYy03NWQwZWY2ZjAyYzQiLCJhdWQiOiI3ZWVsdGNkaXR1cjc0NTRyMW1zYmkwMWE1NiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBhM2MxNjAyLTgyMTMtMTFlOS05YTc5LThiOTdlZjUwODE2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU5MTM1MzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9xMHF0NHAwZzMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzU4ODliMzAtZjA0NS00NjdiLTlhMWMtNzVkMGVmNmYwMmM0IiwiZXhwIjoxNTU5MTM4OTkwLCJpYXQiOjE1NTkxMzUzOTAsImVtYWlsIjoidmlwaW4xN0B5b3BtYWlsLmNvbSJ9.NdRKj7InE-pCnUdU5miyv6XbzlMnQAYW2OPUErUrt4Hl4K_6Rz_hOnvn8I6ABf-Ep2omT_2aEd60ZFnuJOMLyp_javFUAtyQPuOBrLrG6TvneuzO9GLHNOI08Ugna-w1D0JBmqseQJl-NF12hMJSs1_vgOp1SNpZx6MMDOJToxeSJEnrJ2SuUZDdR6vp4ef4c348atFqIJMfmgDf523jord0dbg_MezxZPa25XEueyRJM3koi-jFJ5mFFrj3rLOSm-nhPuCmr02Od0NjcbiWv0hJ9CHPdY-vrJPU44BEGqLQ3ans6LoWOfTZVJuMpb2JzoDmn8IshYVnto2w54WoBg'
//    }
//   let url =CONSTANTS.notificationServiceBaseUrl + CONSTANTS.setEventIdinNotification;
//   return new Promise((resolve, reject) => {
//   request.post({url:url,headers:headers, json: body}, function optionalCallback(err, httpResponse, body) {
//     if (err) {
//        console.error('upload failed:'+err);
//        reject(err);
//     }
//     console.log('Upload successful!  Server responded with:',body);
//     resolve(body);
//   });
// });
// }


// function getGlobalStepFunctionARN(){
//   let stage = "arn:aws:states:ap-south-1:973046228627:stateMachine:GlobalNotificationsForDisappearance";
//   if(CONSTANTS.stage == "QA"){
//     stage = "arn:aws:states:eu-central-1:973046228627:stateMachine:GlobalNotificationsForDisappearance";
//   }else if(CONSTANTS.stage == "prod"){
//     stage = "arn:aws:states:eu-central-1:973046228627:stateMachine:GlobalNotificationsForDisappearance_prod";
//   }
// return stage;
// }
// function startGlobalNotificationHandler(payload,stage="round1"){
  
//   console.log('initiateOneMinuteCheckForFau starts '.payload);

//   var stepfunctions = new AWS.StepFunctions({'region': CONSTANTS.region});
//   let stateMachineArn = getGlobalStepFunctionARN();//CONSTANTS.stage == "QA" ?"arn:aws:states:eu-central-1:973046228627:stateMachine:GlobalNotificationsForDisappearance":'arn:aws:states:ap-south-1:973046228627:stateMachine:GlobalNotificationsForDisappearance';
//   console.log("stateMachineArn >>>>",stateMachineArn);
//   return new Promise((resolve, reject) => {
//     var params = {
//       stateMachineArn: stateMachineArn,//'arn:aws:states:ap-south-1:973046228627:stateMachine:GlobalNotificationsForDisappearance', /* required */
//      // input:JSON.stringify(payload)
//       input: `{
//         \"nextAction\": \"${stage}\",
//         \"user_id\": \"${payload.user_id}\",
//       \"event_id\": \"${payload._id}\",
//       \"name\": \"${payload.name}\",
//       \"age\": \"${payload.age}\",
//       \"corpulence\": \"${payload.corpulence}\",
//       \"eye_color\": \"${payload.eye_color}\",
//       \"hair_color\": \"${payload.hair_color}\",
//       \"h_unit\": \"${payload.h_unit}\",
//       \"height\": \"${payload.height}\",
//       \"language\": \"${payload.language}\",
//       \"shirt_color\": \"${payload.shirt_color}\",
//       \"trouser_color\": \"${payload.trouser_color}\",
//       \"label\": \"${payload.label}\",
//       \"medical_concern\": \"${payload.medical_concern}\",
//       \"is_accompanied\": \"${payload.is_accompanied}\",
//       \"latitude\": \"${payload.location.latitude}\",
//       \"longitude\": \"${payload.location.longitude}\",
//       \"reporter_name\": \"${payload.reporter_name}\",
//       \"reporter_user_id\": \"${payload.reporter_user_id}\",
//       \"time_of_event\": \"${payload.time_of_event}\",
//       \"notification_id\": \"${payload.notification_id}\",
//       \"isHandledByCallCenter\": \"${payload.isHandledByCallCenter}\",
//       \"reporter_relation_id\": \"${payload.reporter_relation_id}\" }`,
//     };
//     stepfunctions.startExecution(params, function (err, data) {
//       if (err) {console.log(err, err.stack); // an error occurred
//       reject(err);}
//       else  {  console.log(data);           // successful response
//         resolve(data);}
//     });
//  });
// }

// sendNotification = async (payload)=>{
//   console.log("sending Notification from PUBNUB",payload);
//   const client =await getPubNubInstance();
//  // console.log("Sending Notification",channelId);
//   return new Promise((resolve, reject) => {
//   console.log("payload",payload);
//   client.publish(payload, function(status, response) {
//       console.log("pubnun response",response);
//       resolve({ response: response });
//   })

//   });
// }

// // This Module create the Events in MongoDB “Events” collection and Send the Real time Push to PSAP_center_id.
// // There 4 types of Event in Boris Platform each are handled differently.
// // 1 Inappropriate Activation: We do not pass these kind of Events to PSAP agent we just Store them in MongoDB with “event_type” as 161.
// // 2 Unperceived Events: We do not pass these kind of Events to PSAP agent we just Store them in MongoDB with “event_type” as 160.
// // 3 Incident Events:  We send these Events to all PSAPs of a PSAP center and Insert the Same in MongoDB with “event_type” as 162.
// // 4 Disappearance Events:  We send these Events to all PSAPs of a PSAP center and Insert the Same in MongoDB with with “event_type” as 163.We start a step function which sends the Notification to the nearby user 
// userController.registerEvent = async (req, res) => {
  
//   let event = req.body;
//   console.log("event :" ,event);
//   try{
//     if(!event.event_type)
//     {
//       return res.send(getErrorObject(400,"Bad Request"));
//     }
//     if(event.event_type == 160){ //160 - Inappropriate Activation
//       if(event.user_id && event.name && event.age && event.inappropriate_activity!=undefined && event.phone_location!=undefined ){

//         let eventDetails = {
//           event_type:event.event_type,
//           user_id:event.user_id,
//           name:event.name,
//           age:event.age,
//           // message: event.message,
//           inappropriate_activity:event.inappropriate_activity,
//           allowed_to_be_contacted:getBooleanValue(event.allowed_to_be_contacted),
//           phone_location:event.phone_location,
//           time_of_event:Date.now(),
//         }
//         let data = await eventModel.insertEvent(eventDetails);
//         console.log("data ",data)
//           if(data == null)
//           return res.send(getSuccessObject(200,"No Record Found",{}));
//       return res.send(getSuccessObject(200,"Event Registerd",{data:{event_id:data._id}}));
//       }else{
//         return res.send(getErrorObject(400,"Bad Request"));
//       }

//     }else if(event.event_type == 161){ // 161 - Unperceived Events
//       if(event.user_id && event.name && event.age && event.unpercieved_activity!=undefined && event.allowed_to_be_contacted!=undefined && event.time_min!=undefined && event.time_max!=undefined){

//         let eventDetails = {
//           event_type:event.event_type,
//           user_id:event.user_id,
//           name:event.name,
//           age:event.age,
//           message: event.message,
//           unpercieved_activity :event.unpercieved_activity,
//           allowed_to_be_contacted:getBooleanValue(event.allowed_to_be_contacted),
//           time_min:event.time_min,
//           time_max:event.time_max,
//           time_of_event:Date.now(),
//           accident_type:event.accident_type 
//         }
//         let data = await eventModel.insertEvent(eventDetails);
//         console.log("data ",data)
//           if(data == null)
//           return res.send(getSuccessObject(200,"No Record Found",{}));
//       return res.send(getSuccessObject(200,"Event Registerd",{data:{event_id:data._id}}));
//       }else{
//         return res.send(getErrorObject(400,"Bad Request"));
//       }

//     }else{

//       // Prevent duplicate Events
//       let existingEvent = undefined;
//       if(event.event_type == 162)
//       existingEvent =await eventModel.activeEventBasedOnUserId(event.user_id,event.event_type)
//      // res.send({"asdf":existingEvent.data.length})
// if(existingEvent && existingEvent.data && existingEvent.data.length && existingEvent.data.length >0){
//       res.send(getSuccessObjectWithLocalization(501,"An Incident event is already registered and is being processed.","ES-057",{}));
// }else
//     if(event.event_type && event.event_type== 162 && event.user_id && event.name && event.age  && event.accident_location){
//      //Incident Events
//       let who_is_involved = [];
//       let accidental_user ={
//         user_id: event.user_id,
//         name: event.name,
//         image_url:event.image_url,
//         dob: "",
//         gender_id: event.gender_id,
//         phone_no: "",
//         email: "",
//         is_cg_user: false,
//         living_same_roof: false,
//         relationship_id: null,
//         cg_user: null,
//         crash_guard_id: null,
//         firstFau:null,
//       //  relation_name: user.relation_name,
//          age: event.age,
//          is_main_user:true,
//         // gender: "Female",
//         eventCompleted: false,
//         isInvolvedInAccident: true,
//         isDoubtfulIdentity: false,
//         medicalHistory: [],
//         doubtfulWith: []
//       } 
//       who_is_involved.push(accidental_user);
//        event.family_network.map((user)=>{
//         let a= {
//           user_id: user.paired_user_id,
//           is_main_user:false,
//           name: user.first_name +" "+ user.last_name,
//           image_url:user.image_url,
//           dob: user.dob,
//           gender_id: user.gender_id,
//           phone_no: "",
//           email: "",
//           is_cg_user: false,
//           living_same_roof: false,
//           relationship_id: user.relationship_id,
//           cg_user: null,
//           crash_guard_id: null,
//           relation_name: user.relation_name,
//           age: user.age,
//           // gender: "Female",
//           eventCompleted: false,
//           isInvolvedInAccident: false,
//           isDoubtfulIdentity: false,
//           medicalHistory: [],
//           doubtfulWith: []
//         }
//         who_is_involved.push(a);
//        // return Object.assign({},user,{isInvolvedInAccident:false,isDoubtfulIdentity:false,medicalHistory:[],doubtfulWith:[],user_id:user_id})
//       });
    
//       console.log("who_is_involved  ",who_is_involved);
//       let eventDetails = {
//         phone_no:event.phone_no,
//         event_type:event.event_type,
//         user_id:event.user_id,//UnAssigned Event
//         code:event.code,
//         name:event.name,
//         age:event.age,
//         image_url:event.image_url,
//         location:event.location,
//         activity :event.activity ,
//         event_status:171,
//         accident_location:event.accident_location,
//         PSAP_center_id:event.PSAP_center_id,
//         FAUS:[],
//         who_is_involved:who_is_involved,
//         assigned_PSAP_agent_name:"",
//         assigned_PSAP_agent_id:"",
//         is_accident_at_home:getBooleanValue(event.is_accident_at_home),
//         is_emergency_reached_to_the_site:false,
//         is_first_fau_reached:false,
//         mode_of_commute:event.mode_of_commute,
//         has_fau_accepted_mission:false,
//         get_fau_for_accident:false,
//         problem_with_constraint:false,
//         emergency_unit_arival_time:"",
//         emergency_unit_id:"",
//         is_unknown_involved_in_accident:false,
//         questionnaire:event.questionnaire,
//         unknown_count:0,
//         time_of_event:Date.now(),
//         notes:[],
//         problems_with_constraints:[],
//         isFAURceruitementCancled:false,
//         is_stroke:getBooleanValue(event.is_stroke),
//         is_heart_attack:getBooleanValue(event.is_heart_attack),
//         isHandledByCallCenter:getBooleanValue(event.isHandledByCallCenter)
//       }
//       let data = await eventModel.insertEvent(eventDetails);
//       console.log("data ",data)
//         if(data == null)
//         return res.send(getSuccessObject(200,"No Record Found",{}));

//       eventDetails.id = data._id;

//       let fauRequest = {
//         "event_id":eventDetails.id,
//         "boris_id":event.user_id,
//         "type":2,
//         "location":event.location
//       };


//       startFAUModuleAsync(fauRequest);
//       // this can block the request as there are times when FAU module does not respond and user will be in dead lock as they wont be able to create another event
//       // let response =  await startSelectFauInFauModule(fauRequest);
//       // console.log("FAU response "+response);
//       let payload = {
//         channel : event.PSAP_center_id,
//         message : {
//           type:"New_Event_detected",
//           data:eventDetails
//         }
//     }
//     if(getBooleanValue(event.isHandledByCallCenter))
//      await sendNotification(payload);
//    // console.log("notificationResult ",notificationResult)
//     return res.send(getSuccessObjectWithLocalization(200,"Event Registerd","ES-001",{data:{event_id:data._id}}));//getSuccessObject(200,"Event Registerd",{data:{event_id:data._id}});
//     }else if(event.event_type && event.event_type== 163){ // Disappearance Events
    
    
//       let eventDetails = {
//         phone_no:event.phone_no,
//         event_type:event.event_type,
//         user_id:event.user_id,//UnAssigned Event
//         isHandledByCallCenter:getBooleanValue(event.isHandledByCallCenter),
//         code:event.code,
//         name:event.name,
//         age:event.age,
//         corpulence:event.corpulence,
//         eye_color:event.eye_color,
//         hair_color:event.hair_color,
//         h_unit:event.h_unit,
//         height:event.height,
//         language:event.language,
//         shirt_color:event.shirt_color,
//         trouser_color:event.trouser_color,
//         label:event.label,
//         medical_concern:event.medical_concern,
//         is_accompanied:event.is_accompanied,
//         image_url:event.image_url,
//         location:event.location,
//         is_unknown_location:getBooleanValue(event.is_unknown_location),
//         event_status:171,
//         accident_location:event.accident_location,
//         gender_id: event.gender_id,
//         PSAP_center_id:event.PSAP_center_id,
//         assigned_PSAP_agent_name:"",
//         assigned_PSAP_agent_id:"",
//         reporter_name:event.reporter_name,
//         reporter_user_id:event.reporter_user_id,
//         reporter_relation_id:event.reporter_relation_id,
//         time_of_event:Date.now(),//new Date(event.time_of_event),
//         notes:[],
//         users_in_visinity:[],
//         converstaion_with_PSAP:[],
//         disappeared_before:event.time_of_event,
//         other_info:"",
//         modified_date:"",
//         mission_closed_by_launcher:false,
//         is_realtime_tracking_on:true,
//         vicinity_zone:800,
//         emergency_unit_arival_time:"",
//         emergency_unit_id:"",
//         is_emergency_reached_to_the_site:false,
//         is_user_going_well:false,
//         is_user_foundback:false,
//         possess_boris:getBooleanValue(event.possess_boris),
//         is_shared_child:getBooleanValue(event.is_shared_child),
//         gender:event.gender,
//         reporter_image_url:event.launcher_image!=undefined?event.launcher_image:'',
//         extra_image_url:event.other_image,
//         // is_emergency_reached_to_the_site:false,
//         // is_first_fau_reached:false,
//         // has_fau_accepted_mission:false,
//         // get_fau_for_accident:false,
//         // problem_with_constraint:false,
//         // emergency_unit_arival_time:"",
//         // emergency_unit_id:"",
//         // is_unknown_involved_in_accident:false,
//         // questionnaire:event.questionnaire,
//         // unknown_count:0,
       
//       }
//       let stage = "round1";
//       switch(event.time_of_event){
//         case 65:
//             stage = "round1";
//           break;
//         case 66:
//             stage = "round2";
//           break;
//         case 67:
//             stage = "round3";
//           break; 
//       case 68:
//             stage = "round4";
//           break;  
//       case  69:
//               stage = "round5";
//           break; 
//       }

//       if(!getBooleanValue(event.isHandledByCallCenter)){// We consider Events of Free user as Assigned Event and do not send them to PSAP center(now known as call center)
//         eventDetails.event_status = 169;//
//       }
//       if(event.launcher_location && event.launcher_location.latitude && event.launcher_location.longitude)
//       eventDetails.launcher_location = event.launcher_location;
//       let notificationResultforDisappearance = await createDisappearanceNotification(eventDetails);
//       console.log("notificationResultforDisappearance ", notificationResultforDisappearance)
//       if(notificationResultforDisappearance == undefined || notificationResultforDisappearance.data ==undefined || notificationResultforDisappearance.data._id == undefined){
//         return res.send(getErrorObject(501,"Error while creating notificaion",notificationResultforDisappearance));
//       }
//       eventDetails.notification_id = notificationResultforDisappearance.data._id; 
//       let data = await eventModel.insertEvent(eventDetails);
//       eventDetails.notification_id = notificationResultforDisappearance.data._id; 
//       let setEventIdinDisappearanceNotificationResult = await setEventIdinDisappearanceNotification(data._id,notificationResultforDisappearance.data._id)
//       console.log("setEventIdinDisappearanceNotification >>",setEventIdinDisappearanceNotification);
//       // Set Event Id inside the Notification
//       //Set Event Id inside the notification
//       console.log("eventDetails  ",eventDetails);
//       console.log("notificationResultforDisappearance.data._id ", notificationResultforDisappearance.data._id);
//       console.log("data ",data);
//         if(data == null)
//         return res.send(getSuccessObject(200,"No Record Found",{}));

//       eventDetails._id = data._id;
//       let payload = {
//         channel : event.PSAP_center_id,
//         message : {
//           type:"New_Event_detected",
//           data:eventDetails
//         }
//     }
//     if(getBooleanValue(event.isHandledByCallCenter)){// We consider Events of Free user as Assigned Event and do not send them to PSAP center(now known as call center)
//       let notificationResult = await sendNotification(payload);
//     console.log("notificationResult ",notificationResult)
//     }
    
//     if(event.is_unknown_location == false || (!getBooleanValue(event.isHandledByCallCenter)) ){
//       let startGlobalNotificationHandlerResult =  await startGlobalNotificationHandler(eventDetails,stage);
//       console.log("startGlobalNotificationHandlerResult",startGlobalNotificationHandlerResult);
//       if(startGlobalNotificationHandlerResult.executionArn){
//         let executionArnResult = await eventModel.setExecutionARNofStepFunctionInEvent(eventDetails._id,startGlobalNotificationHandlerResult.executionArn);
//         console.log("executionArnResult",executionArnResult);
//       }
//     }
 
//     return res.send(getSuccessObjectWithLocalization(200,"Event Registerd","ES-001",{data:{event_id:data._id}}));// return getSuccessObject(200,"Event Registerd",{data:{event_id:data._id}});
//     }else{
//       return res.send(getErrorObject(400,"Bad Request"));
//     }
//   }
//   }catch(err){
//     console.log(err);
//     return res.send(getErrorObject(501,"Something Went Wrong",err));
//   }
// };



// function getStartFAULambdaFunction(){
//   let value = "Boris-Lambda-Service-dev-startSelectFau";
//   if(CONSTANTS.stage == "QA"){
//     value = "Boris-Lambda-Service-qa-startSelectFau";
//   }else if(CONSTANTS.stage == "prod"){
//     value = "Boris-Lambda-Service-prod-startSelectFau";
//   }
// return value;
// }

// function startFAUModuleAsync(payload){
//   console.log("startFAUModuleAsync payload",payload);
//   let FunctionName =getStartFAULambdaFunction();// CONSTANTS.stage == "QA" ?"Boris-Lambda-Service-qa-updateNotificationOfDisappearance":'Boris-Lambda-Service-dev-updateNotificationOfDisappearance';

//     return new Promise((resolve, reject) => {
//     // resolve(payload);
//     var lambda = new AWS.Lambda({'region': CONSTANTS.region});
//     var params = {
//       FunctionName: FunctionName,//'boris-notification-service-dev-updateNotificationOfDisappearance', // the lambda function we are going to invoke
//       InvocationType: 'Event',
//       LogType: 'Tail',
//       Payload: JSON.stringify(payload)
//     };
//     lambda.invoke(params, function(err, data) {
//       if (err) {
//         console.log('getStartFAULambdaFunction err '+ err);
//         reject(err);
//       } else {
//         console.log('Lambda_B said  Boris-Lambda-Service-dev-updateNotificationOfDisappearance'+ data);
//         resolve(data);
//       }
//     })
//   });
// }
// userController.getEvents = async (req, res) => {
//   let event = { event_status: req.param('event_status'),
//   PSAP_center_id: req.param('PSAP_center_id'),
//   page_index: req.param('page_index')!=undefined? req.param('page_index'):1,
//   page_size: req.param('page_size')!=undefined? req.param('page_size'):10,
//   headers:
//    { accept: 'application/json, text/plain, */*',
//      'accept-encoding': 'gzip, deflate, br',
//      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
//      Authorization:req.headers['authorization'],
      
// }};
//   console.log("event :" ,event);
//   try{
//     let authorization = event.headers.Authorization;
//     var tokenArray  = authorization.split(' ');
//     let pageIndex = parseInt(event.page_index);
//     let pageSize = parseInt(event.page_size);
//     console.log(tokenArray);
//     let token= tokenArray[1];
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);
//     let data = await eventModel.getEventsFromDB(event,parsedUserDate.sub,pageIndex,pageSize);
//     console.log("notificationResult ",data);
//     return res.send(getSuccessObjectWithLocalization(200,"Records Found","ES-002",{data:data.data,count:data.count}));// return getSuccessObject(200,"Records Found",{data:data.data,count:data.count});
 
//   }catch(err){
//     console.log(err);
//     return res.send(getErrorObject(501,"Something Went Wrong",err));
//   }
// };


//   // getEventBasedOnId  = async (eventId) =>{
//   //   const client =await getConnection();
//   //   const collection = client.db("Boris").collection("Events");
//   //   const data =  await collection.findOne({"_id" : ObjectId(eventId)});
//   //   console.log("clossing connection befotre",client);
//   //   client.close();
//   //   console.log("clossing connection after",client);
//   //   return new Promise((resolve, reject) => {

//   //     if(data == undefined || data == null)
//   //     reject({ "response_code":404,
//   //       "response_message":"No Event Found with the provied Event_id"});
//   //     resolve(data);
// //   })
// //   //return data;
// // }

// // assignEventToPSAP = async (eventId,PSAPAgentId,code,PSAPAgentName)=>{
// //   const client =await getConnection();
// //   const collection = client.db("Boris").collection("Events");
// //   const data =  await collection.findOne({"_id" : ObjectId(eventId)});
  
// //   console.log("data  ",data);
// //   return new Promise((resolve, reject) => {
// //     if(data == undefined || data == null)
// //     reject({ "response_code":400,
// //       "response_message":"No Event Found with the provied Event_id"});
// //       if(data.assigned_PSAP_agent_id !="")
// //       reject({ "response_code":400, 
// //       "response_message":"Event is already assigned to other user"});
// //       if(data.code !=code)
// //       reject({ "response_code":404, 
// //       "response_message":"Invalid Code Provided",
// //       "respose_message_code":"ES-055"});
// //     // if(data.code !=code)
// //     //   reject({ "response_code":404, 
// //     //   "response_message":"Invalid Code Provided"});

// //    // await collection.update({id:userId,notification_id:notificationId},{$set:{'read':true}});
// //     collection.updateOne({"_id" : ObjectId(eventId),"code":code},{$set:{'assigned_PSAP_agent_id':PSAPAgentId,"assigned_PSAP_agent_name":PSAPAgentName,"event_status":169}}).then(result => {
// //       console.log(result);
// //       console.log("clossing connection befotre",client);
// //   client.close();
// //   console.log("clossing connection after",client);
// //       if(result)
// //       resolve({ result: result});
// //       else
// //       reject({ _id: null })
// //     });
// //   });
// // }


// function getCreateMultipleChatLambdaFunction(){
//   let value = "boris-chat-service-dev-createMultipleUserChatDetailsWithPSAP";
//   if(CONSTANTS.stage == "QA"){
//     value = "boris-chat-service-qa-createMultipleUserChatDetailsWithPSAP";
//   }else if(CONSTANTS.stage == "prod"){
//     value = "boris-chat-service-prod-createMultipleUserChatDetailsWithPSAP";
//   }
// return value;
// }


// function addMultipleUsersInChatMicroServices(payload){
//   console.log("insertChatDetailsInChatService",payload);
//   let FunctionName = getCreateMultipleChatLambdaFunction();//CONSTANTS.stage == "QA" ?"boris-chat-service-qa-createMultipleUserChatDetailsWithPSAP":'boris-chat-service-dev-createMultipleUserChatDetailsWithPSAP';

//     return new Promise((resolve, reject) => {
//     // resolve(payload);
//     var lambda = new AWS.Lambda({'region': CONSTANTS.region});
//     var params = {
//       FunctionName: FunctionName,//'boris-notification-service-dev-updateNotificationOfDisappearance', // the lambda function we are going to invoke
//       InvocationType: 'Event',
//       LogType: 'Tail',
//       Payload: JSON.stringify(payload)
//     };
//     lambda.invoke(params, function(err, data) {
//       if (err) {
//         console.log('Lambda_B createMultipleUserChatDetailsWithPSAP err '+ err);
//         reject(err);
//       } else {
//         console.log('Lambda_B createMultipleUserChatDetailsWithPSAP  '+ data.Payload);
//         resolve(data);
//       }
//     })
//   });
// }

// function sendNotificationToUsers(users){
//   let url =CONSTANTS.notificationServiceBaseUrl +CONSTANTS.sendNotifications;
//   console.log('Making call:',url);
//   console.log('users:',users);
//   return new Promise((resolve, reject) => {
//     let body = {
//       "users":users
//     }

//     request.post({url:url, json: body}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('sendNotificationToUsers upload failed:'+err);
//      reject(err);
//   }
//   console.log('sendNotificationToUsers Upload successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// }
// userController.acceptEvent = async (req, res) => {
//   let event = req.body;
//   console.log("event :" +event);
//   //return event; 
//   try{
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent :" ,currentEvent);
//     if(currentEvent.event_status != 171){  //return if Event is already accepted!
//       return res.send(getSuccessObjectWithLocalization(400,"This Event is already assigned to another PSAP agent.","ES-058",{isAlreadtAssigned:true}));//   return getSuccessObject(200,"Event Successfully Assigned",{currentEvent:currentEvent});
//     }
//     let authorization = req.headers['authorization'];//event.headers.Authorization;
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1]
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);
//     let data = await eventModel.assignEventToPSAP(event.event_id,parsedUserDate.sub,event.code,event.PSAP_agent_name);
//     if(data && data.result && data.result.nModified && data.result.nModified == 1){
//       return res.send(getSuccessObjectWithLocalization(200,"Event Successfully Assigned","ES-003",{currentEvent:currentEvent}));//   return getSuccessObject(200,"Event Successfully Assigned",{currentEvent:currentEvent});
//      // return getSuccessObject(200,"Event Successfully Assigned",{currentEvent:currentEvent});
//     }
//     let usersToAddInChatMicroservices = [];
//     let users =[];
//   let payloadToSendToPSAP = {
//     "id":event.boris_id,
//     "channel_id":currentEvent.PSAP_center_id,
//     "notification_type":"REALTIME",
//     "is_persist":"false",
//     "payload":{
//       "type": 'Mission_Accepted',
//       "assigned_PSAP_agent_id":parsedUserDate.sub,
//       "assigned_PSAP_agent_name":event.PSAP_agent_name,
//       "currentEventId":event.event_id,
//       "category":"Day By Day",
//       "message":"Event Accepted by other User!!",
//       "detail":"",
//       "categoryId":132  
//     }
//   }
//   if(currentEvent.event_type == 163){
//     let silentPushToLauncher = {
//       "id":currentEvent.reporter_user_id,
//       "channel_id":currentEvent.reporter_user_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//         "type": 'Event_Accepted_By_PSAP_For_launcher',
//         "assigned_PSAP_agent_name":event.PSAP_agent_name,
//         "assigned_PSAP_agent_id":parsedUserDate.sub,
//         "currentEventId":event.event_id,
//         "obj_id":event.event_id,
//         "category":"Day By Day",
//         "message":"Event Accepted by PSAP",
//         "detail":"",
//         "categoryId":132
//       }
//     }
//     users.push(silentPushToLauncher);
//     usersToAddInChatMicroservices.push(currentEvent.reporter_user_id);
//     let payloadtoSendToDisappearedUSer = {
//       "id":event.boris_id,
//       "channel_id":currentEvent.user_id,
//       "notification_type":"SILENT",
//       "is_persist":"false",
//       "payload":{
//         "type": 'Start_Recordings',
//         "assigned_PSAP_agent_id":parsedUserDate.sub,
//         "assigned_PSAP_agent_name":event.PSAP_agent_name,
//         "currentEventId":event.event_id,
//         "category":"Day By Day",
//         "message":"Event Accepted by other User!!",
//         "detail":"",
//         "categoryId":132
//       }
//     }
//     users.push(payloadtoSendToDisappearedUSer);

//     let viinityUser = {
//       "id":event.event_id,
//       "channel_id":event.event_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//         "type": 'Event_Accepted_By_PSAP',
//         "assigned_PSAP_agent_name":event.PSAP_agent_name,
//         "assigned_PSAP_agent_id":parsedUserDate.sub,
//         "currentEventId":event.event_id,
//         "obj_id":event.event_id,
//         "category":"Day By Day",
//         "message":"Event Accepted by PSAP",
//         "detail":"",
//         "categoryId":132
//       }
//     };

//     users.push(viinityUser);


//     if(currentEvent.users_in_visinity){
//       // For the users who are in vicinity zone before PSAP accepted the Event

//       if(usersToAddInChatMicroservices.length!= 0){
//       let addMultipleUsersInChatMicroServicesResult =  await addMultipleUsersInChatMicroServices({event_id:event.event_id,psap_agent_id:parsedUserDate.sub,userIds:usersToAddInChatMicroservices});
//         console.log("addMultipleUsersInChatMicroServicesResult  ",addMultipleUsersInChatMicroServicesResult)
//     }
//   }
//   users.push(payloadToSendToPSAP);
//   console.log("users  ",users);
//   let result1 = await sendNotificationToUsers(users);
//     return res.send(getSuccessObject(200,"Event Successfully Assigned",{currentEvent:currentEvent}));
 
//   }else{

//     let messageForAccidentalUser = {
//       "id":currentEvent.user_id,
//       "channel_id":currentEvent.user_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//         "type": 'Event_Accepted_By_PSAP_For_Incident_Event',
//         "assigned_PSAP_agent_name":event.PSAP_agent_name,
//         "assigned_PSAP_agent_id":parsedUserDate.sub,
//         "currentEventId":event.event_id,
//         "obj_id":event.event_id,
//         "message":"Event Accepted by PSAP",
//       }
//     };
//     console.log("messageForAccidentalUser >> ",messageForAccidentalUser);
//     users.push(messageForAccidentalUser);
//     users.push(payloadToSendToPSAP);

//     currentEvent.FAUS.map((fau)=>{
//       if(fau.selectedByFAUModule && fau.isMissionAborted ==false && fau.isMissionClosedByFAU ==false){
//      let payloadToSendFAU = {
//        "id":fau.user_id,
//        "channel_id":fau.user_id,
//        "notification_type":"REALTIME",
//        "is_persist":"false",
//        "payload":{
//          "type": 'Event_Accepted_By_PSAP_For_FAU',
//          "currentEventId":event.event_id,
//          "assigned_PSAP_agent_name":currentEvent.assigned_PSAP_agent_name,
//          "PSAP_agent_id":parsedUserDate.sub,
//          "category":"Day By Day",
//          "message":"Event accepted by PSAP Agent",
//          "detail":"",
//          "categoryId":132  
//        }
//      }
//      users.push(payloadToSendFAU);
//      usersToAddInChatMicroservices.push(fau.user_id);
//       }
//     });
//     if(usersToAddInChatMicroservices.length!= 0){
//       let addMultipleUsersInChatMicroServicesResult =  await addMultipleUsersInChatMicroServices({event_id:event.event_id,psap_agent_id:parsedUserDate.sub,userIds:usersToAddInChatMicroservices});
//         console.log("addMultipleUsersInChatMicroServicesResult  ",addMultipleUsersInChatMicroServicesResult)
//     }
//     let result1 = await sendNotificationToUsers(users);
//     console.log("returning REsponse ",currentEvent);
//     return res.send(getSuccessObjectWithLocalization(200,"Event Successfully Assigned","ES-003",{currentEvent:currentEvent}));//   return getSuccessObject(200,"Event Successfully Assigned",{currentEvent:currentEvent});
//   }
  
  
//   }catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     let responseMessageCode = err.respose_message_code ?err.respose_message_code :"G-001";
//   //  return getErrorObject(errorCode,errorMessage);
//   return res.send(getSuccessObjectWithLocalization(errorCode,errorMessage,responseMessageCode,err));//   return getSuccessObject(200,"Event Successfully Assigned",{currentEvent:currentEvent});
//   }

// }


// //Logs
// //14-08-2019 
// //  This function changes 
// // We reuse AWSCognito object in frequent calls
// function updateOnGoingMissionFlagInLaravel(isMissionOngoing,eventId,userId,authorization){
//   let url =CONSTANTS.laravelBaseUrl +CONSTANTS.updateOnGoingMissionFlag;
//   console.log('Making call:',url);
//   console.log('Making call:  eventId',eventId);
//   return new Promise((resolve, reject) => {
//     let body = {
//       "user_id":userId,
//       "on_going_event": isMissionOngoing,
//       "event_id": eventId
//     }
//     var headers= {
//       'Authorization': authorization//'Bearer eyJraWQiOiJHaVFQdElSdU9RRUE4WStFQUFmblhQVlM2a1V4WmtVSjdmd0ljWU8rWmlnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NTg4OWIzMC1mMDQ1LTQ2N2ItOWExYy03NWQwZWY2ZjAyYzQiLCJhdWQiOiI3ZWVsdGNkaXR1cjc0NTRyMW1zYmkwMWE1NiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBhM2MxNjAyLTgyMTMtMTFlOS05YTc5LThiOTdlZjUwODE2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU5MTM1MzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9xMHF0NHAwZzMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzU4ODliMzAtZjA0NS00NjdiLTlhMWMtNzVkMGVmNmYwMmM0IiwiZXhwIjoxNTU5MTM4OTkwLCJpYXQiOjE1NTkxMzUzOTAsImVtYWlsIjoidmlwaW4xN0B5b3BtYWlsLmNvbSJ9.NdRKj7InE-pCnUdU5miyv6XbzlMnQAYW2OPUErUrt4Hl4K_6Rz_hOnvn8I6ABf-Ep2omT_2aEd60ZFnuJOMLyp_javFUAtyQPuOBrLrG6TvneuzO9GLHNOI08Ugna-w1D0JBmqseQJl-NF12hMJSs1_vgOp1SNpZx6MMDOJToxeSJEnrJ2SuUZDdR6vp4ef4c348atFqIJMfmgDf523jord0dbg_MezxZPa25XEueyRJM3koi-jFJ5mFFrj3rLOSm-nhPuCmr02Od0NjcbiWv0hJ9CHPdY-vrJPU44BEGqLQ3ans6LoWOfTZVJuMpb2JzoDmn8IshYVnto2w54WoBg'
//      }

//     request.post({url:url,headers:headers, json: body}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('upload failed:'+err);
//      reject(err);
//   }
//   console.log('Upload successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// };


// insertFAUForEvent = async (eventId,FAU)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//      collection.update({"_id" : ObjectId(eventId)},{ $push: { FAUS: FAU }}).then(result => {
//       console.log("clossing connection befotre",client);
//       client.close();
//       console.log("clossing connection after",client);
//       console.log(result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }



// function isValidMotivationParameter(data){
//   let value = false;
//   switch(data){
//     case "key":
//         value = true;
//       break;
//     case "doctor":
//         value = true;
//       break;
//     case "nurse":
//         value = true;
//       break;
//     case "normal":
//         value = true;
//       break;
//   }
//   return value;
// }

// const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


// function initiateOneMinuteCheckForFau(payload){
  
//   console.log('initiateOneMinuteCheckForFau starts ');
//   return new Promise((resolve, reject) => {
//     var lambda = new AWS.Lambda({'region': CONSTANTS.region});
//     var params = {
//       FunctionName: 'boris-event-service-dev-cancelFAUIfNotRespondedInOneMinute', // the lambda function we are going to invoke
//       InvocationType: 'Event',
//       LogType: 'Tail',
//       Payload: JSON.stringify(payload)
//     };
//     lambda.invoke(params, function(err, data) {
//       if (err) {
//         console.log('Lambda_B err '+ err);
//         reject(err);
//       } else {
//         console.log('Lambda_B said '+ data.Payload);
//         resolve(data);
//       }
//     })
//   });
// }


// // We Updates the selection Status against the User in Event and sends the Real time message/ Notification to the User.
// //We fetch Message(To be send in Notification ) in User’s local from Laravel Service.
// userController.selectFauForEvent = async (req, res) => {
//   let event = req.body;
//   console.log(" selectFauForEven params :" ,event);

//   try{
    
//     if(!event.event_id)
//     return res.send(getErrorObjectForFAUModule(7,"Missing event_id parameter."));
//     if(!event.motivation){
//       return res.send(getErrorObjectForFAUModule(9,"Missing motivation parameter."));
//     }
//     if(!isValidMotivationParameter(event.motivation)){
//       return res.send(getErrorObjectForFAUModule(10,"Invalid motivation parameter."));
//     }

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     let currentFAU = {};
//     console.log("currentEvent :" ,currentEvent);
//     // if(currentEvent.assigned_PSAP_agent_id == "")
//     // return res.send(getErrorObjectForFAUModule(16,"Event is in unassigned state."));

//   currentEvent.FAUS.map((fau)=>{
//     if(fau.user_id == event.boris_id){
//       currentFAU = Object.assign({},fau,{selectedByFAUModule:true});
//     isUserAcceptedInitailly = true;
//     }
//   });
//   // if(isUserAcceptedInitailly == false){
//   //   return getErrorObjectForFAUModule(17,`User ${event.boris_id} was not initally selected`);
//   // }
// console.log("currentFAU  >> ",currentFAU);
//   if(currentFAU.motivation == "key" && getBooleanValue(currentFAU.is_on_event) == true){ // When FAU in inside home of accident, we already have selected  this user as a FAU on User_answer API
//     // now for such user we neither inform them via notification nor we will run cancel missionin one minute logic.
// console.log(" Not ASking FAU as it was selected in user_answer itself")
//     return [];
//   }
//   let users = [];
//   let type = event.motivation == "key"?"SELECTED_FNF":"SELECTED_FAU";
//   let notification_code  = "E-N-001";//event.motivation == "key"?"E-N-001":"E-N-002";
//   let laravelResponse = await getNotificationMessageBasedOnUserId(event.boris_id,notification_code);
//   console.log("selectFauForEven laravelResponse",laravelResponse);
//   let notificationTitleResponseValue = JSON.parse(laravelResponse);
//   let title = "You have been selected for the event, please reach accident site ASAP";
//   if(notificationTitleResponseValue && notificationTitleResponseValue.data && notificationTitleResponseValue.data.message){
//     title= notificationTitleResponseValue.data.message;
//   }
//   let payloadToSendToFAU = {
//     "id":event.boris_id,
//     "channel_id":event.boris_id,
//     "notification_type":"NORMAL",
//     "is_persist":"false",
//     "payload":{
//           "type":type,
//           "obj_id":event.event_id,
//           "motivation":event.motivation,
//           "is_on_event":getBooleanValue(event.is_on_event),
//           "timestamp":Date.now(),
//           "accidental_user_name":currentEvent.name,
//           "category":"Day By Day",
//           "message":title,//"You have been selected for the event, please reach accident site ASAP",
//           "detail":"",
//           "categoryId":132
//     }
//   };
//   let payloadToSendToFAURealTime = {
//     "id":event.boris_id,
//     "channel_id":event.boris_id,
//     "notification_type":"REALTIME",
//     "is_persist":"false",
//     "payload":{
//           "type":type,
//           "obj_id":event.event_id,
//           "motivation":event.motivation,
//           "accidental_user_name":currentEvent.name,
//           "is_on_event":getBooleanValue(event.is_on_event),
//           "timestamp":Date.now(),
//           "category":"Day By Day",
//           "message":title,//"You have been selected for the event, please reach accident site ASAP",
//           "detail":"",
//           "categoryId":132
//     }
//   };
//   users.push(payloadToSendToFAURealTime);
//   users.push(payloadToSendToFAU);
//   //users.push(payloadToSendToPSAP);
//   //let laravelResult = await updateOnGoingMissionFlagInLaravel("1",event.event_id,event.boris_id);
//  // await updateFAUFlagOnFAUModuleSelection(event.event_id,event.boris_id);
//   let result1 = await sendNotificationToUsers(users);
//   // data =  initiateOneMinuteCheckForFau(event);
//   // await sleep(2000);
//   // console.log("data  >>>>",data);
//   //Now we will check and verify the User Has opened the notification within a minute if now we will cancel the USER FAU status,
//   //return result1;
//   return res.send([]);
 
//   }catch(err){
//     console.log("err",err);
//   //  return err;
//     let message = err.response_code == 404? "Invalid event_id parameter.":"Internal server error.";
//     let code = err.response_code == 404? 8:1;
//     return res.send(getErrorObjectForFAUModule(code,message));
//   }

// }

// function getNotificationMessageBasedOnUsersLocale(users,notificationMessage,accidentalUserId){
//   let url =CONSTANTS.laravelBaseUrl +CONSTANTS.getNotificationMessageBasedOnUsersLocale;
//   console.log('Making call:',url);
//   console.log('users:',users);
//   return new Promise((resolve, reject) => {
//     let body = {
//       "accident_user_id":accidentalUserId,
//       "user_ids":users,
//       "message_code":notificationMessage
//     }
//     console.log('body :',body);
//     request.post({url:url, json: body}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('sendNotificationToUsers upload failed:'+err);
//      reject(err);
//   }
//   console.log('sendNotificationToUsers Upload successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// }


// function getFirstAidLevelById(firstAidLevelId){
//   let firstAidLevel = "normal";
//   switch(firstAidLevelId)
// {
//   case 137:
//     firstAidLevel = "normal";
//   break;
//   case 138:
//     firstAidLevel = "normal";
//   break;
//   case 139:
//     firstAidLevel = "nurse";
//   break;
//   case 140:
//     firstAidLevel = "doctor";
//   break;
// }
// return firstAidLevel;
// }


// // FAU Module passes UserIds of potential FAU to event Service; and Based on Type of Event (Normal Event or Accident at Home) 
// // and relation in between Potential FAU and the User involved in accident we send the appropriate Request to Join the mission.
// // Event service fetch Potential FAU below information from Laravel Service
// // 	1.) FAU Level. (Motivation)
// // 	2.) Relation between Potential FAU and User involved in accident.
// userController.askUsersForMission = async (req, res) => {
//   try{
//     let event =req.body;//JSON.parse(reqString);// req.body;
//     console.log("askUsersForMission params :"+event);

//     if(!event.event_id)
//     return res.send(getErrorObjectForFAUModule(7,"Missing event_id parameter."));

//     let notificationToSentFromPubnub = {
//       "message":"Request",
//       "type":"MISSION_REQUEST",
//       "obj_id":event.event_id,
//     }
//     let usersForLaravelREquest = event.boris_ids;

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent :" ,currentEvent);
//     if(currentEvent == null || currentEvent == undefined)
//     return res.send(getErrorObjectForFAUModule(8,"Invalid event_id parameter."));

//     let laravelUserWithMessage =await getNotificationMessageBasedOnUsersLocale(usersForLaravelREquest,"E-N-002",currentEvent.user_id);//,"E-N-002"
//     console.log("laravelUserWithMessage >> ", JSON.stringify(laravelUserWithMessage));
//     //let userWithMessage = JSON.parse(laravelUserWithMessage);
//    // console.log("userWithMessage>>", userWithMessage);
//     let users = [];event.boris_ids.map((userId)=>{
//       let type = "";
//       let motivation = ""
  
//       let title = "Request to check an accident registered near you";
//       if(laravelUserWithMessage && laravelUserWithMessage.data && laravelUserWithMessage.data.users && laravelUserWithMessage.data.users.length){
  
//         laravelUserWithMessage.data.users.map((laravelUSer)=>{
//           if(userId == laravelUSer.user_id && laravelUSer.message){
//             console.log("changing title based on locale",laravelUSer.message)
//             title = laravelUSer.message;
//               motivation = "Normal";
//               type = "MISSION_REQUEST";
//             if(laravelUSer.is_key_holder && getBooleanValue(currentEvent.is_accident_at_home)){
//               motivation = "key";
//               type = "MISSION_REQUEST_FNF";
//             }else{
//               motivation = getFirstAidLevelById(laravelUSer.first_aid_level);
//               type = "MISSION_REQUEST";
//             }
//           }
//         })
//       }
//       let u = {
//         "id":userId,
//         "channel_id":userId,
//         "notification_type":"NORMAL",
//         "is_persist":"false",
//         "payload":{
//               "type":type,
//               "obj_id":event.event_id,
//               "motivation":motivation,
//               "category":"Day By Day",
//               "message":title,//"Request to check an accident registered near you",
//               "detail":"",
//               "categoryId":132
//         }
//       }
//       users.push(u);
//     })
//     let notificationResult = await sendNotificationToUsers(users);
//     //let notificationResult = await sendNotification(payload);
  
//       return res.send([]); 


 
//   }catch(err){
//     console.log("err ",err)
//     let message = err.response_code == 404? "Invalid event_id parameter.":"Internal server error.";
//     let code = err.response_code == 404? 8:1;
//     return res.send(getErrorObjectForFAUModule(code,message));
//   }

// }

// function userAnswerToFauModule(event){

//   console.log('userAnswerToFauModule:',event);
//   return new Promise((resolve, reject) => {
//     if(!event.event_id || !event.boris_id || !event.answer ){
//       reject({ "response_code":400, 
//       "response_message":"Bad Request"});
//     }
//    // CONSTANTS.NODE_TLS_REJECT_UNAUTHORIZED = "1";

//     let url =`${CONSTANTS.fauModuleBaseUrl}${CONSTANTS.user_answer}?event_id=${event.event_id}&boris_id=${event.boris_id}&answer=${event.answer}`;
//     console.log('startSelectFauInFauModule:   url >>>>',url);
//     request.get({url:url}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('failed:'+err);
//      reject(err);
//   }
//   console.log('successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// }

// //We forward the User’s respond to the FAU module and insert the FAU in the appropriate Event.
// userController.userAnswer = async (req, res) => {
//   let event = req.body;
//   console.log("event :" ,event);
 
//   try{
//     if(!event.event_id || req.headers == undefined || req.headers['authorization']== undefined)
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002"));//return getSuccessObject(400,"Bad Request");
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent :" ,currentEvent);
//     // if(currentEvent.assigned_PSAP_agent_id == "")
//     // return res.send(getSuccessObjectWithLocalization(400,"This Event is not Assigned to any PSAP Agent Yet","ES-004"));

//       if(event.answer && event.answer == "1"){
//         let FAU ={
//           user_id:event.boris_id,
//           motivation:event.motivation,
//           is_on_event:getBooleanValue(event.is_on_event),
//           mode_of_commute:event.mode_of_commute,
//           name:event.name,
//           image_url:event.image_url,
//           selectedByFAUModule:false,
//           phone_number:event.phone_number,
//           dob:event.dob,
//           address:event.address,
//           isMissionAborted:false,
//           isMissionClosedByFAU:false
//         };
//         let isAlreadyPresent = false;
//         currentEvent.FAUS.map((fau)=>{
//           if(fau.user_id == event.boris_id)
//           isAlreadyPresent = true;
//         });
//         if(isAlreadyPresent){
//           return res.send(getSuccessObject(400,"You have Alreaddy Responded to the Event, Please wait"));
//         }
//            // Comenting this for Going to QA without FAU Module
//        let data =  await userAnswerToFauModule(event);
//        console.log("userAnswerToFauModule  >>>>   ", data);
//            // Comenting this for Going to QA without FAU Module
//       //  let fauModuleREsponse = JSON.parse(data);
//       //  if(fauModuleREsponse == undefined || fauModuleREsponse.length == undefined || fauModuleREsponse.length==1 ){
//       //   return getSuccessObject(501,fauModuleREsponse[0].error.description,fauModuleREsponse[0]);
//       //  }
//       //  console.log("fauModuleREsponse  ",fauModuleREsponse);

//       console.log("FAU  >>>",FAU);
//       if(FAU.motivation == "key" && getBooleanValue(FAU.is_on_event) == true)
//           FAU.selectedByFAUModule = true;
//           FAU.location ={
//             latitude:parseFloat(event.latitude),
//             longitude:parseFloat(event.longitude)
//           }
//         let result =  await eventModel.insertFAUForEvent(event.event_id,FAU);
//         if(FAU.motivation == "key" && getBooleanValue(FAU.is_on_event) == true){ // When FAU in inside home of accident, we sisect this user as a FAU from this point only
//           // and will make the required changes in send_user api. now for such user we neither inform them via notification nor we will run cancel missionin one minute logic.
      
//           console.log("MAking him FAU in User_answer")
//           let users = [];
//           let payloadToSendToPSAP = {
//             "id":event.boris_id,
//             "channel_id":currentEvent.assigned_PSAP_agent_id,
//             "notification_type":"REALTIME",
//             "is_persist":"false",
//             "payload":{
//                   "type":"Add_New_FAUS",
//                   "obj_id":"",
//                   "motivation":event.motivation,
//                   "currentEventId":event.event_id,
//                   "FAUS":[FAU],
//                   "is_on_event":getBooleanValue(event.is_on_event),
//                   "category":"Day By Day",
//                   "message":"Event Alert!!",
//                   "detail":"",
//                   "categoryId":132
//             }
//           };
//          await eventModel.updateFAUFlagOnFAUModuleSelection(event.event_id,event.boris_id);
//           let laravelResult = await updateOnGoingMissionFlagInLaravel("1",event.event_id,event.boris_id,req.headers['authorization']);
//           console.log("laravelResult   >>>>>>>>  ",laravelResult)
//           users.push(payloadToSendToPSAP);
//           console.log(payloadToSendToPSAP);
//           let result1 = await sendNotificationToUsers(users);

//           return res.send(getSuccessObjectWithLocalization(200,"Thanks you are a FAU Now","ES-005"));
//         }
//         return res.send(getSuccessObjectWithLocalization(200,"We have informed the FAU Module","ES-006"));
//       }else{ // If user Says No, calls 
//        // console.log("before call :" ,FAU);
//         return res.send(getSuccessObjectWithLocalization(200,"You have not accepted this Event, Thanks","ES-007"));
//         //let laravelResult = await updateOnGoingMissionFlagInLaravel("1",event.event_id,event.boris_id);
//       //  let 
//       }
 
//   }catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     return res.send(getErrorObject(errorCode,errorMessage));
//   }
// }



// //Its localization is handled locally on PSAP based on these strings changing message will impact PSAP
// function parseProblemWithConstraintMessage(type,detail){
//   let message = "";
//   switch(type){
//     case "key":
//       message = `No key holder recruited.`;
//       break;
//     case "doctor":
//       message = `Not enough doctors recruited.`;
//       break;
//     case "nurse":
//       message = `Not enough nurses recruited.`;
//       break;
//     case "normal":
//       message = "Not enough ‘normal’ users recruited.";
//       break;
//     case "emergency":
//         message = "Not enough ‘emergency’ users recruited.";
//       break;
//     case "medical":
//         message = "Not enough ‘medical’ users recruited.";
//       break;
//   }
// return message;
// }

// //We update(in problems_with_constraint array) this information in EventDB and send the appropriate information to the PSAP Agent as a real time message.
// userController.problemWithConstraint = async (req, res) => {
//   try{

//     let event = req.body;
//     console.log("problemWithConstraint params:" ,event);
//     if(!event.event_id)
//     return res.send(getErrorObjectForFAUModule(7,"Missing event_id parameter."));
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent :" ,currentEvent);
//     if(currentEvent == null)
//     return res.send(getErrorObjectForFAUModule(8,"Invalid event_id parameter.."));

//     // if(currentEvent.assigned_PSAP_agent_id == "")
//     // return res.send(getErrorObjectForFAUModule(16,"Event is in unassigned state."));
//     let description = parseProblemWithConstraintMessage(event.type,event.detail)
//     let details ={
//       type:event.type,
//       detail:event.detail,
//       date:new Date(),
//       description:description
//     };
//     console.log("details>>",details);
//     console.log("description>>",description);
//     let data = await eventModel.updateProblemWithConstraintInMongoDB(event.event_id,details)
//     let users = [];
  
//     let payloadToSendToPSAP = {
//       "id":event.boris_id,
//       "channel_id":currentEvent.assigned_PSAP_agent_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//         "type": 'Problem_With_Constraint',
//         "description":description,
//         "reason":event.type,
//         "detail":event.detail,
//         "currentEventId":event.event_id,
//         "category":"Day By Day",
//         "message":"Problem_with_constraint for "+event.event_id,
//         "detail":"",
//         "categoryId":132
//       }
//     }
//     users.push(payloadToSendToPSAP);
//     let result1 = await sendNotificationToUsers(users);
//     return res.send([]);
//   //  return getSuccessObject(200,"Notification is sent to the PSAP");
//   }catch(err){
//     console.log("err",err);
//     let message = err.response_code == 404? "Invalid event_id parameter.":"Internal server error.";
//     let code = err.response_code == 404? 8:1;
//     return res.send(getErrorObjectForFAUModule(code,message));
//   }
// }


// function startSelectFauInFauModule(event){

//   console.log('startSelectFauInFauModule:',event);
//   return new Promise((resolve, reject) => {
//     if(!event.event_id || !event.boris_id || !event.type || !event.location || !event.location.latitude || !event.location.longitude ){
//       reject({ "response_code":400, 
//       "response_message":"Bad Request"});
//     }
//     //CONSTANTS.NODE_TLS_REJECT_UNAUTHORIZED = "1";
//     let url =`${CONSTANTS.fauModuleBaseUrl}${CONSTANTS.start_select_fau}?event_id=${event.event_id}&boris_id=${event.boris_id}&type=${event.type}&location={"lat":"${event.location.latitude}","lng":"${event.location.longitude}"}`;
//     console.log('startSelectFauInFauModule:   url >>>>',url);
//     request.get({url:url}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('startSelectFauInFauModule failed:'+err);
//      reject(err);
//   }
//   console.log('startSelectFauInFauModule successful!  Server responded with:',body);
//   if(body == undefined){
//     resolve([{"error": {"code": "404", "description": "FAU Module is not responding"}}]);
//   }else
//   resolve(JSON.parse(body));
// });
//   });
// }



// // We inform the FAU module to start the selection process and pass the appropriate information to FAU Module. 
// // We also keep track of “Selection process in progress” to show appropriate information to PSAP
// userController.startSelectFau = async (req, res) => {
//   let event = req.body;
//   console.log("event :" ,event);
 
//   try{
//     if(!event.event_id)
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002")); //return getSuccessObject(400,"Bad Request");
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent :" ,currentEvent);
//     if(!currentEvent)
//     return res.send(getSuccessObjectWithLocalization(404,"No Event Found for the Given Id","ES-008"));
//     if(currentEvent.assigned_PSAP_agent_id == "")
//     return res.send(getSuccessObjectWithLocalization(400,"This Event is not Assigned to any PSAP Agent Yet","ES-009"));

// // Comenting this for Going to QA without FAU Module
//    let response =  await startSelectFauInFauModule(event);

//   console.log("FAU MODULE REsponse >>> ",response);

//   if(response == undefined || response == null || response.length == undefined || response.length == null || response.length!=0){
//     let message = response[0].error ? response[0].error.description:"FAU Module is not responding";
//     return res.send(getSuccessObjectWithLocalization(500,message,"ES-010",response));
//   }
//   // Comenting this for Going to QA without FAU Module
//    let test = await eventModel.updateStartSelectFauFlagInMongoDB(event.event_id);
//    return res.send(getSuccessObjectWithLocalization(200,"We have Informed FAU Module","ES-010"));
//   // return getSuccessObject(11,"This Event is not Assigned to any PSAP Agent Yet");

//   }catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     return res.send(getErrorObjectWithLocalization(errorCode,errorMessage,"G-001",err));
//    // return getErrorObject(errorCode,errorMessage);
//   }
// }


// // We update the “on_going_Event” flag in Laravle and mark the selection of FAU in Event. 
// // And push this Real Time information to the PSAP center.
// userController.finalCallFromFAUForSelection = async (req, res) => {
//   let event = req.body;
//   console.log("finalCallFromFAUForSelection params:"+event);
//   try{
//     if(!event.event_id || req.headers == undefined || req.headers['authorization'] == undefined)
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002"));//  return getSuccessObject(400,"Missing event_id parameter.");

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     let currentFAU = {};
//     console.log("currentEvent :" ,currentEvent);
//     // if(currentEvent.assigned_PSAP_agent_id == "")
//     // return res.send(getSuccessObjectWithLocalization(400,"Event is in unassigned state.","ES-011"));
//   //  return currentEvent;
//   let FAU ={
//     user_id:event.boris_id,
//     motivation:event.motivation,
//     is_on_event:getBooleanValue(event.is_on_event)
//   };
//   let isUserAcceptedInitailly = false;
//   currentEvent.FAUS.map((fau)=>{
//     if(fau.user_id == event.boris_id){
//       currentFAU = Object.assign({},fau,{selectedByFAUModule:true});
//     isUserAcceptedInitailly = true;
//     }
//   });
//   if(isUserAcceptedInitailly == false){
//     return res.send(getSuccessObjectWithLocalization(400,"User was not initally selected.","ES-012"));//(17,`User was not initally selected`);
//   }
//   let users = [];

//   let channel_id= currentEvent.assigned_PSAP_agent_id;
//   if(currentEvent.isHandledByCallCenter == false){
//     let chatPayload = {
//       event_id:event.event_id,
//       user1_id:event.boris_id,
//       user2_id:currentEvent.user_id
//     }
//     let chatDetailResult = await insertChatDetailsInChatService(chatPayload);
//     console.log("created chatDetailResult on finalCallFromFAUForSelection",chatDetailResult);
//     channel_id = currentEvent.user_id;
//   } else if(currentEvent.assigned_PSAP_agent_id!=""){
//     let chatPayload = {
//       event_id:event.event_id,
//       user1_id:event.boris_id,
//       user2_id:currentEvent.assigned_PSAP_agent_id
//     }
//     let chatDetailResult = await insertChatDetailsInChatService(chatPayload);
//     console.log("created chatDetailResult created fro FAU and PSAP",chatDetailResult);
//   }

//   let payloadToSendToPSAP = {
//     "id":channel_id,
//     "channel_id":channel_id,
//     "notification_type":"REALTIME",
//     "is_persist":"false",
//     "payload":{
//           "type":"Add_New_FAUS",
//           "obj_id":event.event_id,
//           "motivation":event.motivation,
//           "currentEventId":event.event_id,
//           "FAUS":[currentFAU],
//           "is_on_event":event.is_on_event,
//           "category":"Day By Day",
//           "message":"Event Alert!!",
//           "detail":"",
//           "categoryId":132
//     }
//   };
//   let laravelResult = await updateOnGoingMissionFlagInLaravel("1",event.event_id,event.boris_id,req.headers['authorization']);
//   console.log(" finalCallFromFAUForSelection laravelResponse  :",laravelResult);
//   await eventModel.updateFAUFlagOnFAUModuleSelection(event.event_id,event.boris_id);
//   users.push(payloadToSendToPSAP);
//   console.log("payloadToSendToPSAP >> "+payloadToSendToPSAP);
//   let result1 = await sendNotificationToUsers(users);

//  // await sleep(30000);
//   //Now we will check and verify the User Has opened the notification within a minute if now we will cancel the USER FAU status,
//   //return result1;
//   return res.send(getSuccessObjectWithLocalization(200,"Event is started! please go the Event Location ASAP","ES-013"));
 
//   }catch(err){
//     console.log("err",err);
//     let message = err.response_code == 404? "Invalid event_id parameter.":"Something went Wrong.";
//     let code = err.response_code == 404? err.response_code:400;
    
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));// return getSuccessObject(code,message);
//   }
// }

// userController.getEventById = async (req, res) => {
//   let event = {
//     event_id:req.param("event_id")
//   };
//   try{
//     console.log("event",event);
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     if(currentEvent.event_type == 163)
//     currentEvent.change_logs = [];
//     return res.send(getSuccessObjectWithLocalization(200,"Event Found","ES-014",currentEvent));
//   }
//   catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     return res.send(getErrorObjectWithLocalization(errorCode,errorMessage,"G-001",err));//  return getErrorObject(errorCode,errorMessage);
//   }
// }

// //We sends a Real time Push to other FAU’s and PSAP agent when First FAU reached to the accident side. And Update the same in Event DB.
// userController.FAUResponseAfterReachingAccidentSite = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("FAUResponseAfterReachingAccidentSite params:",event);
//     if(req.headers == undefined || req.headers['authorization'] == undefined)
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002"));// return getSuccessObject(400,`Bad Request`);
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//       let isUserAcceptedInitailly = false;
//       let otherFauWhomeScreenWillGetChanged = [];
//       let currentFAU ={};
//   currentEvent.FAUS.map((fau)=>{
//     if(fau.user_id == event.boris_id){
//       currentFAU = Object.assign({},fau,{selectedByFAUModule:true});
//     isUserAcceptedInitailly = true;

//     }else if(fau.selectedByFAUModule  && fau.isMissionAborted == false){
//       let payloadToSendToFAU = {
//         "id":event.boris_id,
//         "channel_id":fau.user_id,
//         "notification_type":"REALTIME",
//         "is_persist":"false",
//         "payload":{
//               "type":"First_Fau_Reached_On_Site",
//               "obj_id":event.event_id,
//               "isAnyOneInjured":event.isAnyOneInjured,
//               "category":"Day By Day",
//               "message":"Event Alert!!",
//               "detail":"",
//               "categoryId":132
//         }
//       };

//       otherFauWhomeScreenWillGetChanged.push(payloadToSendToFAU);
//     }
//   });

//   //commenting for development for mobile team
//   if(isUserAcceptedInitailly == false){
//     return res.send(getSuccessObjectWithLocalization(400,`You are not the FAU for this Event`,"ES-016"));
//   }
//   let payloadToSendToPSAP = {
//     "id":event.boris_id,
//     "channel_id":currentEvent.assigned_PSAP_agent_id,
//     "notification_type":"REALTIME",
//     "is_persist":"false",
//     "payload":{
//           "type":"Fau_Reached_On_Site",
//           "currentEventId":event.event_id,
//           "FAU_id":currentFAU.user_id,
//           "name":currentFAU.name,
//           "isAnyOneInjured":event.isAnyOneInjured,
//           "category":"Day By Day",
//           "message":"Event Alert!!",
//           "detail":"",
//           "categoryId":132
//     }
//   };
//   let is_first_fau = false;
//   await eventModel.updateFAUTimeOfArrival(event.event_id,event.boris_id);

//   let payloadToSendToAccidentalUser = {
//     "id":currentEvent.user_id,
//     "channel_id":currentEvent.user_id,
//     "notification_type":"REALTIME",
//     "is_persist":"false",
//     "payload":{
//           "type":"Fau_Reached_On_Site",
//           "currentEventId":event.event_id,
//           "FAU_id":currentFAU.user_id,
//           "name":currentFAU.name,
//           "isAnyOneInjured":event.isAnyOneInjured,
//           "category":"Day By Day",
//           "message":"Event Alert!!",
//           "detail":"",
//           "categoryId":132
//     }
//   };
//  if(currentEvent.firstFau == undefined || currentEvent.firstFau == null){
//     //consider this FAU as the first FAU.

//     otherFauWhomeScreenWillGetChanged.push(payloadToSendToPSAP);
//     otherFauWhomeScreenWillGetChanged.push(payloadToSendToAccidentalUser);
//     console.log("consider this FAU as the first FAU",otherFauWhomeScreenWillGetChanged);
//     let result =await sendNotificationToUsers(otherFauWhomeScreenWillGetChanged);
//     let firstFau = {
//       "user_id":event.boris_id
//     }
//     let r = await eventModel.updateFirstFauForEventInMongoDB(event.event_id,firstFau);
//     is_first_fau = true;
//             console.log("consider this FAU as the first FAU.");
//   }else{
//     let payload =[];
//     payload.push(payloadToSendToPSAP);
//     payload.push(payloadToSendToAccidentalUser);
//     let result =await sendNotificationToUsers(payload);
//   }

//   if(getBooleanValue(event.isAnyOneInjured)){// if User Confirms People are envolved in accident
//     console.log("if User Confirms People are envolved in accident.")
//   }
//   else{ 
//     // We will Inject Who is Involevd with no injuries to PSAP and will update the same in Mongo BD
//    let who_is_involved = currentEvent.who_is_involved.map((user)=>{
//       return Object.assign({},user,{isInvolvedInAccident:false,isDoubtfulIdentity:false});
//     })
//     await eventModel.updateWhoIsInvolvedInMongoDB(event.event_id,who_is_involved,currentEvent,false);
//     let users = [];
//     let isUnknown = false;
//     let unKnownCount = 0;
//     let payloadToSendToFAU = {
//       "id":event.boris_id,
//       "channel_id":currentEvent.assigned_PSAP_agent_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//             "type":"Who_Is_Involved_By_FAU",
//             "currentEventId":event.event_id,
//             "who_Is_Involved_By_FAU":who_is_involved,
//             "obj_id":"",
//             "is_unknown_involved_in_accident":isUnknown,
//             "unknown_count":unKnownCount,
//             // "motivation":event.motivation,
//             // "is_on_event":event.is_on_event,
//             "category":"Day By Day",
//             "message":"Event Alert!!",
//             "detail":"",
//             "categoryId":132
//       }
//     };
//     users.push(payloadToSendToFAU);
//     let result1 = await sendNotificationToUsers(users);
//   //let FAUModuleResponse = await cancelMissionForFauInFauModule(event);
//   //  let laravelResult = await updateOnGoingMissionFlagInLaravel("0","",event.boris_id,req.headers['authorization']);
//     let laravelResult = await updateOnGoingMissionFlagInLaravel("0",event.event_id,event.boris_id,req.headers['authorization']);
   
//     console.log("We will Inject Who is Involevd with no injuries to PSAP and will update the same in Mongo BD.",laravelResult)
//   }
//     return res.send(getSuccessObjectWithLocalization(200,"Thank You For Your Response.","ES-015",{is_first_fau:is_first_fau}));
//   }
//   catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err)); //return getErrorObjectWithLocalization(501,"something went wrong","G-001",err);//  return getErrorObject(errorCode,errorMessage);
//   }
// }



// function cancelMissionForFauInFauModule(event){

//   console.log('startSelectFauInFauModule:',event);
//   return new Promise((resolve, reject) => {
//     if(!event.event_id || !event.boris_id ){
//       reject({ "response_code":400, 
//       "response_message":"Bad Request"});
//     }
//    // CONSTANTS.NODE_TLS_REJECT_UNAUTHORIZED = "1";
//     let url =`${CONSTANTS.fauModuleBaseUrl}${CONSTANTS.cancel_mission}?event_id=${event.event_id}&boris_id=${event.boris_id}`;
//     console.log('startSelectFauInFauModule:   url >>>>',url);
//     request.get({url:url}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('startSelectFauInFauModule failed:'+err);
//      reject(err);
//   }
//   console.log('startSelectFauInFauModule successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// }


// // We update the “is_on_going” flag in Laravel service and End the Mission for the FAU based on below details based on flag "isAbortedInBetween":
// // 1.) Aborted mission in between: We update this Information in FAU Module and in EventDB and then send this information as a Real Time message to PSAP Agent.
// // 2.) Complete the mission: We update the information in EventDB and inform the same to PSAP Agent with real time push.
// userController.endMissionForFAU = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("event",event);
//     if(req.headers == undefined || req.headers['authorization']== undefined || event.event_id == undefined)
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002"));//return getSuccessObject(400,`Bad Request`);
 

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//       let isUserAcceptedInitailly = false;
//       let currentFAU={};
//       let MessageToSendotherFauWhomeScreenWillGetChanged = [];
//       let isLastFAU = true;
//   currentEvent.FAUS.map((fau)=>{
//     if(fau.user_id == event.boris_id){
//       currentFAU = Object.assign({},fau,{selectedByFAUModule:true});
//     isUserAcceptedInitailly = true;
//     }else if(fau.selectedByFAUModule && fau.isMissionClosedByFAU == false && fau.isMissionAborted == false){
//       isLastFAU = false;
//     }
//   });
//   if(isUserAcceptedInitailly == false){
//     return getSuccessObjectWithLocalization(400,`You are not the FAU for this Event`,"ES-017");
//   }

//   let laravelResult = await updateOnGoingMissionFlagInLaravel("0",event.event_id,event.boris_id,req.headers['authorization']);
//   console.log("laravelResult  ",laravelResult);
//   let notificationPayload = [];
//   if(getBooleanValue(event.isAbortedInBetween)){ // FAU Aborted the Mission In between will Will inform the same to FAU module.
//     // Comenting this for Going to QA without FAU Module
    
//      let cancelMissionInFauModuleResult = cancelMissionForFauInFauModule(event);
//     let cancelMissionInEventDBResult = eventModel.closeMissonByFAUInEventDB(event.event_id,event.boris_id,true);
//     await cancelMissionInFauModuleResult;
//     await cancelMissionInEventDBResult;
//     let payloadToSendToPSAP = {
//       "id":event.boris_id,
//       "channel_id":currentEvent.assigned_PSAP_agent_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//             "type":"Mission_Aborted_By_Fau",
//             "currentEventId":event.event_id,
//             "name":currentFAU.name,
//             "isAnyOneInjured":event.isAnyOneInjured,
//             "FAU_id":currentFAU.user_id,
//             "category":"Day By Day",
//             "message":"Event Alert!!",
//             "detail":"",
//             "categoryId":132
//       }
//     };
//     let payloadToSendToAccidentalUser = {
//       "id":currentEvent.user_id,
//       "channel_id":currentEvent.user_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//             "type":"Mission_Aborted_By_Fau",
//             "currentEventId":event.event_id,
//             "name":currentFAU.name,
//             "isAnyOneInjured":event.isAnyOneInjured,
//             "FAU_id":currentFAU.user_id,
//             "category":"Day By Day",
//             "message":"Event Alert!!",
//             "detail":"",
//             "categoryId":132
//       }
//     };
//     notificationPayload.push(payloadToSendToPSAP);
//     notificationPayload.push(payloadToSendToAccidentalUser);
//     await sendNotificationToUsers(notificationPayload);
//     console.log("cancelMissionInFauModuleResult",cancelMissionInFauModuleResult);
//     console.log("cancelMissionInEventDBResult",cancelMissionInEventDBResult);
//       // Comenting this for Going to QA without FAU Module
//     return res.send(getSuccessObjectWithLocalization(200,"You have Aboarted the Mission in Between.","ES-018"));
//   }
//   let payloadToSendToAccidentalUser = {
//     "id":currentEvent.user_id,
//     "channel_id":currentEvent.user_id,
//     "notification_type":"REALTIME",
//     "is_persist":"false",
//     "payload":{
//           "type":"Mission_Closed_By_Fau",
//           "currentEventId":event.event_id,
//           "name":currentFAU.name,
//           "FAU_id":currentFAU.user_id,
//           "category":"Day By Day",
//           "message":"Event Alert!!",
//           "detail":"",
//           "categoryId":132
//     }
//   };
//   notificationPayload.push(payloadToSendToAccidentalUser);
//   await sendNotificationToUsers(notificationPayload);
//   await eventModel.closeMissonByFAUInEventDB(event.event_id,event.boris_id,false);

//   if(getBooleanValue(event.isEmergencyUnitArrived)){ 
//   // FAU Aborted the Mission In between will Will inform the same to FAU module.
   
//     let cancelMissionInEventDBResult = await eventModel.closeMissonByFAUInEventDB(event.event_id,event.boris_id,false);
//     let notificationPayload = [];
//     let payloadToSendToPSAP = {
//       "id":event.boris_id,
//       "channel_id":currentEvent.assigned_PSAP_agent_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{                       
//             "type":"Mission_Completed_By_Fau",
//             "currentEventId":event.event_id,
//             "name":currentFAU.name,
//             "isAnyOneInjured":event.isAnyOneInjured,
//             "FAU_id":currentFAU.user_id,
//             "category":"Day By Day",
//             "message":"Event Alert!!",
//             "detail":"",
//             "categoryId":132
//       }
//     };
//     notificationPayload.push(payloadToSendToPSAP);
//     if(isLastFAU && currentEvent.isHandledByCallCenter == false){ // close the Event as well
//       console.log("As this is the last FAU which has completed the mission we are closing the free Event");
//       let payloadToSendToAccidentalUser = {
//         "id":currentEvent.user_id,
//         "channel_id":currentEvent.user_id,
//         "notification_type":"REALTIME",
//         "is_persist":"false",
//         "payload":{                       
//               "type":"Mission_Marked_Closed_By_Fau",
//               "currentEventId":event.event_id,
//               "category":"Day By Day",
//               "message":"Event Alert!!",
//               "detail":"",
//               "categoryId":132
//         }
//       };
//       await eventModel.closeFreeEventInMongoDB(event.event_id);
//       await closeFreeIncidentEventInLaravel(currentEvent.user_id,event.event_id);
//       await closeEventInFauInFauModule(event);
//       notificationPayload.push(payloadToSendToAccidentalUser);// Send Push to accidental User
//     }
//     await sendNotificationToUsers(notificationPayload);   
//     return res.send(getSuccessObjectWithLocalization(200,"Emergency were reached on site.","ES-019"));
//   }else{

//     let notificationPayload = [];
//     if(isLastFAU && currentEvent.isHandledByCallCenter == false){ // close the Event as well
//       console.log("As this is the last FAU which has completed the mission we are closing the free Event");
//       let payloadToSendToAccidentalUser = {
//         "id":currentEvent.user_id,
//         "channel_id":currentEvent.user_id,
//         "notification_type":"REALTIME",
//         "is_persist":"false",
//         "payload":{                       
//               "type":"Mission_Marked_Closed_By_Fau",
//               "currentEventId":event.event_id,
//               "category":"Day By Day",
//               "message":"Event Alert!!",
//               "detail":"",
//               "categoryId":132
//         }
//       };
//       await eventModel.closeFreeEventInMongoDB(event.event_id);
//       await closeFreeIncidentEventInLaravel(currentEvent.user_id,event.event_id);
//       await closeEventInFauInFauModule(event);
//       notificationPayload.push(payloadToSendToAccidentalUser);// Send Push to accidental User
//     }
//     await sendNotificationToUsers(notificationPayload); 
//     return res.send(getSuccessObjectWithLocalization(200,"FAU had to leave before emergeny units had reached.","ES-020"));
//   }
//   }
//   catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));// return getErrorObject(errorCode,errorMessage);
//   }
// }

// // Both FAU and PSAP can updates “who_is_involved” list.
// // 1.) Submitted by FAU: Update the “who_is_involved” in EventDB and set “is_first_fau_reached” to true and send this information to PSAP as a real time Message.
// // 2.)  Submitted by PSAP: Update the “who_is_involved” in EventDB and set “is_who_is_involved_submitted_by_PSAP” to true
// userController.submitWhoIsInvolvedInEvent = async (req, res) => {
// let event = req.body;
// console.log("submitWhoIsInvolvedInEvent Params ",event);
//   try{
//     console.log("event",event);
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//       let isUserAcceptedInitailly = false;
//       if(event.submited_by == "FAU"){
//         console.log("Inside FAU", event.boris_id);
//         currentEvent.FAUS.map((fau)=>{
//           console.log("fau ", fau.user_id);
//           if(fau.user_id == event.boris_id){
//             console.log("Inside FAU match ", event.boris_id);
//             currentFAU = Object.assign({},fau,{selectedByFAUModule:true});
//           isUserAcceptedInitailly = true;
//           }
//         });
//         if(isUserAcceptedInitailly == false){
//           return res.send(getSuccessObjectWithLocalization(400,"You are not the FAU for this Event","ES-021"));
//         }
//         console.log("Inside FAU 12");
//         await eventModel.updateWhoIsInvolvedInMongoDB(event.event_id,event.who_is_involved,event,false)
//         console.log("Inside FAU 13");
//         let users = [];
//         let isUnknown = getBooleanValue(event.is_unknown_involved_in_accident);
//         let unKnownCount = event.unknown_count?event.unknown_count:0;
//         let payloadToSendToFAU = {
//           "id":event.boris_id,
//           "channel_id":currentEvent.assigned_PSAP_agent_id,
//           "notification_type":"REALTIME",
//           "is_persist":"false",
//           "payload":{
//                 "type":"Who_Is_Involved_By_FAU",
//                 "currentEventId":event.event_id,
//                 "who_Is_Involved_By_FAU":event.who_is_involved,
//                 "obj_id":"",
//                 "is_unknown_involved_in_accident":isUnknown,
//                 "unknown_count":unKnownCount,
//                 "motivation":event.motivation,
//                 "is_on_event":event.is_on_event,
//                 "category":"Day By Day",
//                 "message":"Event Alert!!",
//                 "detail":"",
//                 "categoryId":132
//           }
//         };
//         users.push(payloadToSendToFAU);
//         let result1 = await sendNotificationToUsers(users);
//         console.log("Inside FAU result1 ",result1);
//         return res.send(getSuccessObjectWithLocalization(200,"Thank you for submitting","ES-022"));
//          //Push the Information Realtime to PSAP Agent
//       }if(event.submited_by == "PSAP"){ //updated By PSAP
//         console.log("Inside PSAP");
//         // Update the Who is Involved in Accident
//         await eventModel.updateWhoIsInvolvedInMongoDB(event.event_id,event.who_is_involved,event,true)
//         return res.send(getSuccessObjectWithLocalization(200,"Thank you for submitting","ES-022"));
//       }else{ //updated By PSAP
  
//          return res.send(getSuccessObjectWithLocalization(200,`You are not the FAU for this Event`,"ES-021"));

//       }




//   }
//   catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//  //   return getErrorObject(errorCode,errorMessage);
//  return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));//  return getSuccessObject(errorCode,errorMessage);
//   }

// };


// userController.submitNotesInEvent = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("event",event);
//     let authorization = req.headers['authorization'];
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1]
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     if(currentEvent.assigned_PSAP_agent_id == undefined || currentEvent.assigned_PSAP_agent_id == null){
//       return res.send(getSuccessObjectWithLocalization(400,"Event is in unassigned state","ES-023"))
//     }else
//     if(parsedUserDate.sub!=currentEvent.assigned_PSAP_agent_id){
//       return res.send(getSuccessObjectWithLocalization(400,"You are not the PSAP for this Event","ES-024"))
//     }
//     let note ={
//       "note":event.note,
//       "time_stamp":Date.now(),
//       "note_taken_by":event.note_taken_by
//     }
//     let result = await eventModel.updateNotesInMongoDB(event.event_id,note);
//     return res.send(getSuccessObjectWithLocalization(200,"Notes Updated","ES-025"));
//       let isUserAcceptedInitailly = false;    


//   }
//   catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
   
// return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));//   return getErrorObject(errorCode,errorMessage);
//   }
// };


// function closeEventInFauInFauModule(event){

//   console.log('closeEventInFauInFauModule:',event);
//   return new Promise((resolve, reject) => {
//     if(!event.event_id ){
//       reject({ "response_code":400, 
//       "response_message":"Bad Request"});
//     }
//    // CONSTANTS.NODE_TLS_REJECT_UNAUTHORIZED = "1";
//     let url =`${CONSTANTS.fauModuleBaseUrl}${CONSTANTS.close_event}?event_id=${event.event_id}`;
//     console.log(" CONSTANTS.fauModuleBaseUrl "+CONSTANTS.fauModuleBaseUrl);
//     console.log(" CONSTANTS.close_event "+CONSTANTS.close_event);
//  console.log("close event URL ",url);
//     request.get({url:url}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error(' failed:'+err);
//      reject(err);
//   }
//   console.log(' successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// }



// //We update the “event_status” to 172 and insert all the information related to the persons involved in event sent by the PSAP agent
// // And sends the real time message to all the Active FAUs.
// userController.closeEventByPSAP = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("closeEventByPSAP params :",event);
//     let authorization = req.headers['authorization'];
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1]
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     if(currentEvent.assigned_PSAP_agent_id == undefined || currentEvent.assigned_PSAP_agent_id == null){
//       return res.send(getSuccessObjectWithLocalization(400,"Event is in unassigned state","ES-026"));
//     }else
//     if(parsedUserDate.sub!=currentEvent.assigned_PSAP_agent_id){
//       return res.send(getSuccessObjectWithLocalization(400,"You are not the PSAP Agent for this Event","ES-027"));
//     }
//        // Comenting this for Going to QA without FAU Module
//    let fauModuleResult = await closeEventInFauInFauModule(event);
//    console.log("closeEventByPSAP fauModuleResult:",fauModuleResult);

// // Comenting this for Going to QA without FAU Module
//    let users =[];

//    currentEvent.FAUS.map((fau)=>{
//      if(fau.selectedByFAUModule && fau.isMissionAborted ==false && fau.isMissionClosedByFAU ==false){
//     let payloadToSendToPSAP = {
//       "id":event.boris_id,
//       "channel_id":fau.user_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//         "type": 'Mission_Ended',
//         "currentEventId":event.event_id,
//         "category":"Day By Day",
//         "message":"Event Ended by PSAP Agent",
//         "detail":"",
//         "categoryId":132  
//       }
//     }
//     users.push(payloadToSendToPSAP);
//      }
//    });



//    let payloadToSendToAccidentalUser = {
//     "id":currentEvent.user_id,
//     "channel_id":currentEvent.user_id,
//     "notification_type":"REALTIME",
//     "is_persist":"false",
//     "payload":{
//       "type": 'Mission_Closed_By_Agent',
//       "currentEventId":event.event_id,
//       "category":"Day By Day",
//       "message":"Event Ended by PSAP Agent",
//       "detail":"",
//       "categoryId":132  
//     }
//   }
//   users.push(payloadToSendToAccidentalUser);

//    let result1 = await sendNotificationToUsers(users);

// //   console.log("closeEventInFauInFauModule >>>>>>>       ",fauModuleResult);
//     let result = await eventModel.closeEventInMongoDB(event.event_id,event.who_is_involved);
//     let closeFreeIncidentEventInLaravelResult = await closeFreeIncidentEventInLaravel(currentEvent.user_id,event.event_id);
//     console.log("closeFreeIncidentEventInLaravelResult "+closeFreeIncidentEventInLaravelResult);

//     return res.send(getSuccessObjectWithLocalization(200,"Event has been closed","ES-028"));
  
//   }
//   catch(err){
//     console.log("err",err);
//    let errorCode = err.response_code ?err.response_code :501;
//           let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//           return res.send(getErrorObjectWithLocalization(errorCode,errorMessage,"G-001",err));
//  ///         return getErrorObject(errorCode,errorMessage);
//   }
// };

// //We update the Emergency Details in Mongo DB and set I”s_emergency_reached_to_the_site“ to True.
// userController.arrivalOfEmergencyUnit = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("arrivalOfEmergencyUnit params: ",event);
//     let authorization = req.headers['authorization'];
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1]
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     if(currentEvent.assigned_PSAP_agent_id == undefined || currentEvent.assigned_PSAP_agent_id == null){
//       return res.send(getSuccessObjectWithLocalization(400,"Event is in unassigned state","ES-029"));
//     }else
//     if(parsedUserDate.sub!=currentEvent.assigned_PSAP_agent_id){
//       return res.send(getSuccessObjectWithLocalization(400,"You are not the PSAP Agent for this Event","ES-030"));
//     }

//     let result = await eventModel.arrivalOfEmergencyUnitInMongoDB(event);
//     return res.send(getSuccessObjectWithLocalization(200,"Emergency Unit Details Updated","ES-031"));
  
//   }
//   catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     return res.send(getErrorObjectWithLocalization(errorCode,errorMessage,"G-001",err));//  return getErrorObject(errorCode,errorMessage);
//   }
// };

// //API call “/select_more_fau” of FAU Module to recruit more FAU for the event
// function sendMoreFausInFauModule(event){

//   console.log('startSelectFauInFauModule:',event);
//   return new Promise((resolve, reject) => {
//     if(event.event_id ==undefined  || event.nb_fau == undefined || event.nb_doctors ==undefined || event.nb_nurses ==undefined || event.event_id ==null  || event.nb_fau == null || event.nb_doctors ==null || event.nb_nurses ==null){
//       reject({ "response_code":400, 
//       "response_message":"Bad Request"});
//     }
//   //  CONSTANTS.NODE_TLS_REJECT_UNAUTHORIZED = "1";
//     let url =`${CONSTANTS.fauModuleBaseUrl}${CONSTANTS.select_more_fau}?event_id=${event.event_id}&options={"nb_fau":"${event.nb_fau}","nb_emergency":"${event.nb_doctors}","nb_medical":"${event.nb_nurses}"}`;
//     console.log('startSelectFauInFauModule:   url >>>>',url);
//     request.get({url:url}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('startSelectFauInFauModule failed:'+err);
//      reject(err);
//   }
//   console.log('startSelectFauInFauModule successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// }


// //We call “select_more_fau” of FAU Module to recruit more FAU for the event
// userController.sendMoreFaus = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("sendMoreFaus params: ",event);
//     let authorization = req.headers['authorization'];
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1]
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     if(currentEvent.assigned_PSAP_agent_id == undefined || currentEvent.assigned_PSAP_agent_id == null){
//       return res.send(getSuccessObjectWithLocalization(400,"Event is in unassigned state","ES-032"));
//     }else
//     if(parsedUserDate.sub!=currentEvent.assigned_PSAP_agent_id){
//       return res.send(getSuccessObjectWithLocalization(400,"You are not the PSAP Agent for this Event","ES-033"));
//     }

//    let result = await sendMoreFausInFauModule(event);
//     return res.send(getSuccessObjectWithLocalization(200,"We have Informed FAU Module","ES-034"));
  
//   }
//   catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));//  return getErrorObject(errorCode,errorMessage);
//   }
// };


// //Logs
// //22-10-2019 
// //Sprint 28
// //  This Handler intercept 'getEventsForAdmin' API and return Closed event for Admin
// userController.getEventsForAdmin = async (req, res) => {
//   let event = { event_status: req.param('event_status'),
//   PSAP_center_id: req.param('PSAP_center_id'),
//   isHandledByCallCenter: req.param('isHandledByCallCenter'),
//   event_type: req.param('event_type'),
//   search: req.param('search'),
//   page_index: req.param('page_index')!=undefined? req.param('page_index'):1,
//   page_size: req.param('page_size')!=undefined? req.param('page_size'):10,
//   headers:
//    { accept: 'application/json, text/plain, */*',
//      'accept-encoding': 'gzip, deflate, br',
//      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
//      Authorization:req.headers['authorization'],
      
// }};
//   try{
//     let authorization = event.headers.Authorization;
//     var tokenArray  = authorization.split(' ');
//     let pageIndex = parseInt(event.page_index);
//     let pageSize = parseInt(event.page_size);
//     let isHandledByCallCenter = getBooleanValue(event.isHandledByCallCenter)
//     let event_type = (event.event_type!=undefined && event.event_type!=null)?parseInt(event.event_type):162;
//     const search = event.search;
//     console.log(tokenArray);
//     let token= tokenArray[1];
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);
//     let data = await eventModel.getEventsForAdminFromDB(pageIndex,pageSize,search,event_type,isHandledByCallCenter);
//     console.log("notificationResult ",data);
//     return res.send(getSuccessObject(200,"Records Found",{data:data.data,count:data.count}));
 
//   }catch(err){
//     console.log(err);
//     return res.send(getErrorObject(501,"Something Went Wrong",err));
//   }
// };

// function parseRequestBody(parts){
//   var requestBody = {};
//   console.log("parts",parts);
//   parts.forEach(function(part) {
//     if(part.type!=undefined && part.filename!=undefined){
//       requestBody[`${part.name}`] =  part;
//     }
//     else{
//       requestBody[`${part.name}`] = querystring.unescape(part.data);
//     }
//   });

//   return requestBody;
// }


// function getUpdateNotificationChatLambdaFunction(){
//   let value = "Boris-Lambda-Service-dev-updateNotificationOfDisappearance";
//   if(CONSTANTS.stage == "QA"){
//     value = "Boris-Lambda-Service-qa-updateNotificationOfDisappearance";
//   }else if(CONSTANTS.stage == "prod"){
//     value = "Boris-Lambda-Service-prod-updateNotificationOfDisappearance";
//   }
// return value;
// }


// //This Function Updates the Updated Users details in Boris-Notification-Service
// function updateNotificationInNotificationMicroservice(payload){
//   console.log("updateNotificationInNotificationMicroserv",payload);
//   let FunctionName =getUpdateNotificationChatLambdaFunction();// CONSTANTS.stage == "QA" ?"Boris-Lambda-Service-qa-updateNotificationOfDisappearance":'Boris-Lambda-Service-dev-updateNotificationOfDisappearance';

//     return new Promise((resolve, reject) => {
//     // resolve(payload);
//     var lambda = new AWS.Lambda({'region': CONSTANTS.region});
//     var params = {
//       FunctionName: FunctionName,//'boris-notification-service-dev-updateNotificationOfDisappearance', // the lambda function we are going to invoke
//       InvocationType: 'Event',
//       LogType: 'Tail',
//       Payload: JSON.stringify(payload)
//     };
//     lambda.invoke(params, function(err, data) {
//       if (err) {
//         console.log('Lambda_B err from Boris-Lambda-Service-dev-updateNotificationOfDisappearance'+ err);
//         reject(err);
//       } else {
//         console.log('Lambda_B said  Boris-Lambda-Service-dev-updateNotificationOfDisappearance'+ data);
//         resolve(data);
//       }
//     })
//   });
// }


// var s3 = null; 
// //This fucntion returs S3 Bucket Instance
// function getS3BucketInstance(){
//   if(s3!=null)
//   return s3;
//     AWS.config.update({
//       accessKeyId: CONSTANTS.accessKeyId,
//       secretAccessKey: CONSTANTS.secretAccessKey,
//       region: CONSTANTS.bucketRegion
//     });
//     console.log("Return S3");
//     s3= new AWS.S3();
//     return s3;
//   }

//   //This Function Uploads data to S3 Bucket
// function uploadToS3Bucket(params){
//   return new Promise((resolve, reject) => {
//     console.log("uploading image",params);
//     let s3Bucket = getS3BucketInstance();// Getting s3 instance 
//     s3Bucket.upload(params, function (err, data) {
//       //handle error
//       if (err) {
//         console.log("error in s3",err);
//         reject(err);
//       }
//       if (data) {
//         resolve(data);
//       }
//     });
// });
// }


// // This is a multipart request and PSAP can update both images and other details of a disappearance Event and Execute “updateNotificationOfDisappearance” Lambda Function.
// // Also PSAP can assign the location to The disappearance Event which initially was created as a unknown location; 
// //in this case  We start “GlobalNotificationsForDisappearance” step function and set the Execution details in Event.
// userController.updateDisappearedUserDetails = async (req, res) => {
//   try{
//     let event = Object.assign({},req.body);
//     console.log("updateDisappearedUserDetails params ",event);

//     req.files.map((file)=>{
//       event[`${file.fieldname}`] = {
//         data:file.buffer,
//         filename:file.originalname,
//         type:file.mimetype
//       }
//     });
//       requestObject = event;//parseRequestBody(parts);
//   console.log("requestObject",requestObject)
//       let imageUploadResult = null;

//       if(requestObject.image!=undefined && requestObject.image!=null && requestObject.image.data!=undefined && requestObject.image.data!=null){
//         console.log("inside image handling ")
//         var fileStream = new stream.Readable();
//         fileStream.push(requestObject.image.data);
//         fileStream.push(null);
    
//         let directory = "dev/";//`${CONSTANTS.disappearanceDirectory}/${folder}`; // creating directory based on boris_id
//         if(CONSTANTS.stage == "QA")
//         directory = "qa/";
//         else  if(CONSTANTS.stage == "prod")
//         directory = "prod/";
//         let ext =requestObject.image.filename.split(".");
//         let fileName = `Disappearance-${Date.now()}.${ext[1]}`
//         var params = {
//         Bucket: CONSTANTS.disappearanceBucket,
//         Body : fileStream,
//         Key : directory+fileName,
//         ACL: 'public-read'
//       };
//       imageUploadResult = await uploadToS3Bucket(params);
//     //   console.log("inside image imageUploadResult  ", imageUploadResult);
//       }
//       if(imageUploadResult!=null && imageUploadResult.Location){
//         requestObject.image_url = imageUploadResult.Location;
//       }
//       let imageUploadResult2 = null;
//       if(requestObject.other_image!=undefined && requestObject.other_image!=null && requestObject.other_image.data!=undefined && requestObject.other_image.data!=null){
//         console.log("inside image handling ")
//         var fileStream = new stream.Readable();
//         fileStream.push(requestObject.other_image.data);
//         fileStream.push(null);
    
//         let directory = "dev/";//`${CONSTANTS.disappearanceDirectory}/${folder}`; // creating directory based on boris_id
//         if(CONSTANTS.stage == "QA")
//         directory = "qa/";
//         else if(CONSTANTS.stage == "prod")
//         directory = "prod/";
//         let ext =requestObject.other_image.filename.split(".");
//         let fileName = `Disappearance-otherImage-${Date.now()}.${ext[1]}`
//         var params = {
//         Bucket: CONSTANTS.disappearanceBucket,
//         Body : fileStream,
//         Key : directory+fileName,
//         ACL: 'public-read'
//       };
//       imageUploadResult2 = await uploadToS3Bucket(params);
//     //   console.log("inside image imageUploadResult  ", imageUploadResult2);
//       }
//       if(imageUploadResult2!=null && imageUploadResult2.Location){
//         requestObject.other_image_url = imageUploadResult2.Location;
//       }
//       let imageUploadResult3 = null;
//       if(requestObject.extra_image!=undefined && requestObject.extra_image!=null && requestObject.extra_image.data!=undefined && requestObject.extra_image.data!=null){
//       //  console.log("inside image handling ")
//         var fileStream = new stream.Readable();
//         fileStream.push(requestObject.extra_image.data);
//         fileStream.push(null);
    
//         let directory = "dev/";//`${CONSTANTS.disappearanceDirectory}/${folder}`; // creating directory based on boris_id
//         if(CONSTANTS.stage == "QA")
//         directory = "qa";
//         else if(CONSTANTS.stage == "prod")
//         directory = "prod";
//         let ext =requestObject.extra_image.filename.split(".");
//         let fileName = `Disappearance-extra_image-${Date.now()}.${ext[1]}`
//         var params = {
//         Bucket: CONSTANTS.disappearanceBucket,
//         Body : fileStream,
//         Key : directory+fileName,
//         ACL: 'public-read'
//       };
//       imageUploadResult3 = await uploadToS3Bucket(params);
//     //   console.log("inside image imageUploadResult  ", imageUploadResult3);
//       }
//       if(imageUploadResult3!=null && imageUploadResult3.Location){
//         requestObject.extra_image_url = imageUploadResult3.Location;
//       }

      
//      let currentEvent = await eventModel.updateDisappearanceDoccument(requestObject);
    
//      console.log("after image upload >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",currentEvent);
//      if(getBooleanValue(requestObject.location_assigned_to_unknown_location_event)){
//       // Prevent duplicat notification creation.
//       //let notificationResultforDisappearance = await createDisappearanceNotification(currentEvent.result.value);

//       if(currentEvent && currentEvent.result && currentEvent.result.value)
//       await updateNotificationInNotificationMicroservice(currentEvent.result.value);
//        //inform launcher
//       // we will start the Global Step Function in Background
//      let startGlobalNotificationHandlerResult =  await startGlobalNotificationHandler(currentEvent.result.value,"round1");
//      console.log("startGlobalNotificationHandlerResult ", startGlobalNotificationHandlerResult);
//      let executionArnResult = await eventModel.setExecutionARNofStepFunctionInEvent(currentEvent.result.value._id,startGlobalNotificationHandlerResult.executionArn);
//      console.log("executionArnResult>>> ",executionArnResult);

//      }else{
//        // We update the Notification in Boris-Notification-Service.
//        if(currentEvent && currentEvent.result && currentEvent.result.value)
//       await updateNotificationInNotificationMicroservice(currentEvent.result.value);
//      }
//      console.log("currentEvent  ",currentEvent);
//     //  if(currentEvent && currentEvent.result && currentEvent.result.value)
//     //  await updateNotificationInNotificationMicroservice(currentEvent.result.value);

//      return res.send(getSuccessObjectWithLocalization(200,"Disappearance Details updated","ES-035",currentEvent));
// }catch(err){
//   console.log(err);
//   return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));// console.log("error   >>>> ",err);
// }
// };




// //Logs
// //13-12-2019 
// //Sprint 31
// //  This Function add User in vicinity Zone based on userId and eventId
// // insertUserForDisappearanceEvent = async (eventId,user)=>{
// //   const client =await getConnection();
// //  // let eventId = "5d4d3b954b7561a5b1792283";
// //   const collection = client.db("Boris").collection("Events");
// //   return new Promise((resolve, reject) => {
// //      collection.update({"_id" : ObjectId(eventId)},{ $push: { users_in_visinity: user }}).then(result => {
// //       console.log("result".result);
// //       if(result)
// //       resolve({ result: result});
// //       else
// //       reject({ _id: null })
// //     });
// //   });
// // }

// //Logs
// //23-05-2019 
// //Sprint 40
// //  This Function add User in vicinity Zone based on userId and eventId
// insertUserForConversationDisappearanceEvent = async (eventId,user)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//      collection.update({"_id" : ObjectId(eventId)},{ $push: { converstaion_with_PSAP: user }}).then(result => {
//       console.log("result".result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }

// //Logs
// //13-12-2019 
// //Sprint 31
// //  This Function Removes User from vicinity Zone based on userId and eventId
// removeUserForDisappearanceEvent = async (eventId,user)=>{
//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {

    
//      collection.update({"_id" : ObjectId(eventId)},{ $pull: { users_in_visinity: {"user_id":user.user_id} }}).then(result => {
//       console.log("result".result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }

// function getCreateChatUrl(){
// let vaue= "boris-chat-service-dev-createChatDetails";
// if(CONSTANTS.stage == "QA"){
//   vaue= "boris-chat-service-qa-createChatDetails";
// }else if(CONSTANTS.stage == "prod"){
//   vaue= "boris-chat-service-prod-createChatDetails";
// }
// return vaue;
// }


// //This Function Create Chat entry in Boris-Chat-Service
// function insertChatDetailsInChatService(payload){
//   console.log("insertChatDetailsInChatService",payload);
//   let FunctionName = getCreateChatUrl();//CONSTANTS.stage == "QA" ?:'boris-chat-service-dev-createChatDetails';

//     return new Promise((resolve, reject) => {
//     // resolve(payload);
//     var lambda = new AWS.Lambda({'region': CONSTANTS.region});
//     var params = {
//       FunctionName: FunctionName,//'boris-notification-service-dev-updateNotificationOfDisappearance', // the lambda function we are going to invoke
//       InvocationType: 'Event',
//       LogType: 'Tail',
//       Payload: JSON.stringify(payload)
//     };
//     lambda.invoke(params, function(err, data) {
//       if (err) {
//         console.log('Lambda_B err '+ err);
//         reject(err);
//       } else {
//         console.log('Lambda_B said '+ data.Payload);
//         resolve(data);
//       }
//     })
//   });
// }


// //Logs
// //13-12-2019 
// //Sprint 31
// //  This handler intercept '/selectUserForDisappearance' and add or removes users in vicinity Zone based on 'inside_vicinity_area' flag.
// //This module both add and remove the users with in a vicinity. Based on below details.
// // 1.) Add user: Insert the user in vicinity by adding/updated user in  “users_in_visinity” array and send a real time push to PSPA Agent
// // and if  the User come to an event’s vicinity for the first Time we also create the “chat Details” of user with Chat Service.
// // 2.) Remove User: We remove the User from “users_in_visinity” array and sends a real time push to PSAP.
// userController.selectUserForDisappearance = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("event",event);
//     let user = {
//       user_id:event.user_id,
//       age:event.age,
//       image_url:event.image_url,
//       latitude:event.latitude,
//       longitude:event.longitude,
//       name:event.name,
//       phone_number:event.phone_number,
//       dob:event.dob,
//       address:event.address,
//       isAcknoledged:false,
//       isAllMessagesSeen:true,
//       chat:[],
//       is_canceled:false
//     }
//     let is_user_already_in_zone = false;
//     let is_user_already_in_conversion = false;
//     console.log("user",user);
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent",currentEvent);
//     if(currentEvent.user_id == undefined || currentEvent.users_in_visinity  == undefined){
//       return res.send(getSuccessObjectWithLocalization(501,"No Event Found","ES-036"));
//     }
//     currentEvent.users_in_visinity.map((user=>{
//       if(user.user_id == event.user_id && getBooleanValue(event.inside_vicinity_area) == true)
//       is_user_already_in_zone = true;
//     }))

//     if(currentEvent.converstaion_with_PSAP){
//       currentEvent.converstaion_with_PSAP.map((user=>{
//         if(user.user_id == event.user_id && getBooleanValue(event.inside_vicinity_area) == true)
//         is_user_already_in_conversion = true;
//       }))
//     }


//     if(is_user_already_in_zone){
//       return res.send(getErrorObject(200,"You are already in Zone"));
//     }
//     if(getBooleanValue(event.inside_vicinity_area)){
//       // add user in conversation array start
//       if(is_user_already_in_conversion == false){
//         let insertUserForConversationDisappearanceEventResponse = await eventModel.insertUserForConversationDisappearanceEvent(event.event_id,user);
//         console.log("insertUserForConversationDisappearanceEventResponse >> ",insertUserForConversationDisappearanceEventResponse);
//       }
//       //add user in conversation array ends
//       if(currentEvent.assigned_PSAP_agent_id){
//         let chatPayload ={
//           event_id:event.event_id,
//           user1_id:event.user_id,
//           user2_id:currentEvent.assigned_PSAP_agent_id
//         }
//         let chatDetailResult = await insertChatDetailsInChatService(chatPayload);
//         console.log("chatDetailResult ",chatDetailResult);
//       }

// let data = await eventModel.insertUserForDisappearanceEvent(event.event_id,user);
// // let laravelResult = await updateOnGoingMissionFlagInLaravel("1",event.event_id,event.user_id,event.headers.Authorization);
// // console.log("laravelResult",laravelResult);
// console.log("data  ",data);
// let payloadToSendToPSAP = {
//   "id":event.user_id,
//   "channel_id":currentEvent.assigned_PSAP_agent_id,
//   "notification_type":"REALTIME",
//   "is_persist":"false",
//   "payload":{
//         "type":"Add_User_In_Vicinity",
//         "obj_id":"",
//         "currentEventId":event.event_id,
//         "usersInVicinity":[user],
//         "category":"Day By Day",
//         "message":"Event Alert!!",
//         "categoryId":132
//   }
// };
// console.log("payloadToSendToPSAP  ",payloadToSendToPSAP);
// let notificationUSers = [];
// notificationUSers.push(payloadToSendToPSAP);
// let  result= await sendNotificationToUsers(notificationUSers);
// console.log("sendNotificationToUsers",result);
// return res.send(getSuccessObject(200,"User Added in Vicinity",data));
//     }else{
//       let data = await eventModel.removeUserForDisappearanceEvent(event.event_id,user);
//      // let laravelResult = await updateOnGoingMissionFlagInLaravel("0",event.event_id,event.user_id,event.headers.Authorization);
//     //  console.log("laravelResult",laravelResult);
// console.log("data  ",data);
// let payloadToSendToPSAP = {
//   "id":event.user_id,
//   "channel_id":currentEvent.assigned_PSAP_agent_id,
//   "notification_type":"REALTIME",
//   "is_persist":"false",
//   "payload":{
//         "type":"Remove_User_From_Vicinity",
//         "obj_id":"",
//         "currentEventId":event.event_id,
//         "usersInVicinity":user,
//         "category":"Day By Day",
//         "message":"Event Alert!!",
//         "categoryId":132
//   }
// };
// console.log("payloadToSendToPSAP  ",payloadToSendToPSAP);
// let notificationUSers = [];
// notificationUSers.push(payloadToSendToPSAP);
// let  result= await sendNotificationToUsers(notificationUSers);
// console.log("sendNotificationToUsers",result);
// return res.send(getSuccessObjectWithLocalization(200,"User Removed From Vicinity Area","ES-037",data));
//     }

// }catch(err){
//   return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));//return getErrorObject(501,"Inernal Server error",err);
// }
// };



// function getSendBuldMessageUrl(){
//   let value = "boris-chat-service-dev-sendMessagesByPSAPInBulk";
//   if(CONSTANTS.stage == "QA"){
//     value = "boris-chat-service-qa-sendMessagesByPSAPInBulk";
//   }else if(CONSTANTS.stage == "prod"){
//     value = "boris-chat-service-prod-sendMessagesByPSAPInBulk";
//   }
// return value;
// }

// //
// function sendBulkMessagetoUsersFromPSAP(payload){
//   console.log("sendBulkMessagetoUsersFromPSAP  ",payload);
//   let FunctionName = getSendBuldMessageUrl();//CONSTANTS.stage == "QA" ?"boris-chat-service-qa-sendMessagesByPSAPInBulk":'boris-chat-service-dev-sendMessagesByPSAPInBulk';

//     return new Promise((resolve, reject) => {
//     // resolve(payload);
//     var lambda = new AWS.Lambda({'region': CONSTANTS.region});
//     var params = {
//       FunctionName: FunctionName,//'boris-notification-service-dev-updateNotificationOfDisappearance', // the lambda function we are going to invoke
//       InvocationType: 'Event',
//       LogType: 'Tail',
//       Payload: JSON.stringify(payload)
//     };
//     lambda.invoke(params, function(err, data) {
//       if (err) {
//         console.log('Lambda_B createMultipleUserChatDetailsWithPSAP err '+ err);
//         reject(err);
//       } else {
//         console.log('Lambda_B createMultipleUserChatDetailsWithPSAP  '+ data.Payload);
//         resolve(data);
//       }
//     })
//   });
// }

// userController.sendMessageToUsersinVicinity = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("sendMessageToUsersinVicinity params",event);
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent",currentEvent);
//     let notificationUSers = [];
    
//     let authorization = req.headers['authorization'];
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1];
//     let parsedUserDate = decodeAccessToken(token);
//     let usersToSendMessages = [];
//     currentEvent.users_in_visinity.map((user)=>{
//     if(getBooleanValue(user.is_canceled) == false){
 
//   let payloadToSendToPSAP = {
//     "id":event.event_id,
//     "channel_id":user.user_id,
//     "notification_type":"NORMAL",
//     "is_persist":"false",
//     "payload":{
//           "type":"Chat_Message",
//           "obj_id":event.event_id,
//           "name":"",
//           "currentEventId":event.event_id,
//           "PSAP_agent_name":currentEvent.assigned_PSAP_agent_name,
//           "message_from":parsedUserDate.sub,
//           "inserted_id":0,
//           "category":"Day By Day",
//           "message":event.message,
//           "categoryId":132
//     }
//   };
//   console.log("payloadToSendToPSAP  ",payloadToSendToPSAP);
//   notificationUSers.push(payloadToSendToPSAP);
//   usersToSendMessages.push(user.user_id);
// }


// });
// console.log("notificationUSers ",notificationUSers);
// console.log("usersToSendMessages ",usersToSendMessages);
// if(usersToSendMessages && usersToSendMessages.length>0)
// await sendBulkMessagetoUsersFromPSAP({event_id:event.event_id,psap_agent_id:currentEvent.assigned_PSAP_agent_id,userIds:usersToSendMessages,message:event.message});
// let  result= await sendNotificationToUsers(notificationUSers);
// console.log("sendNotificationToUsers",result);
// return res.send(getSuccessObjectWithLocalization(200,"Message has been Sent to all the users in Vicinity","ES-038",result));
// }catch(err){
//   console.log("err ",err);
//   return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));// return getErrorObject(501,"Inernal Server error",err);
// }
// };

// //Logs
// //13-12-2019 
// //Sprint 31
// //  This Function mark is_cancel flag to true for user in Event JSON
// // userCancelledDisappearanceEvent = async (eventId,user)=>{
// //   const client =await getConnection();
// //   const collection = client.db("Boris").collection("Events");
// //   return new Promise((resolve, reject) => {
// //     collection.updateOne(
// //      { _id: ObjectId(eventId), "users_in_visinity.user_id": user.user_id },
// //      { $set: { "users_in_visinity.$.is_canceled" : true } }
// //   ).then(result => {
// //    console.log("clossing connection befotre",client);
// //    client.close();
// //    console.log("clossing connection after",client);
// //      console.log(result);
// //      if(result)
// //      resolve({ result: result});
// //      else
// //      reject({ _id: null })
// //    });
// //  });

// //}

// //Logs
// //16-12-2019 
// //Sprint 32 Boris - 3220
// //  This handler intercept '/cancelResearchForDisappearance' API and cancel the Disappearance Event for user.
// userController.cancelResearchForDisappearance = async (req, res) => {
//   let event = req.body;
//   try{

//     if(event.event_id == undefined || event.user_id == undefined || req.headers== undefined || req.headers['authorization'] == undefined)
//     return res.send(getErrorObject(400,"Bad Request"));
//     console.log("event",event);
//     let user = {
//       user_id:event.user_id
//     }
//     console.log("user",user);
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent",currentEvent);

//       let data = await eventModel.userCancelledDisappearanceEvent(event.event_id,user);
//       let laravelResult = await updateOnGoingMissionFlagInLaravel("0",event.event_id,event.user_id,req.headers['authorization']);
//       console.log("laravelResult",laravelResult);
// console.log("data  ",data);
// let payloadToSendToPSAP = {
//   "id":event.user_id,
//   "channel_id":currentEvent.assigned_PSAP_agent_id,
//   "notification_type":"REALTIME",
//   "is_persist":"false",
//   "payload":{
//         "type":"Remove_User_From_Vicinity",
//         "obj_id":"",
//         "currentEventId":event.event_id,
//         "usersInVicinity":user,
//         "category":"Day By Day",
//         "message":"Event Alert!!",
//         "categoryId":132
//   }
// };
// console.log("payloadToSendToPSAP  ",payloadToSendToPSAP);
// let notificationUSers = [];
// notificationUSers.push(payloadToSendToPSAP);
// let  result= await sendNotificationToUsers(notificationUSers);
// console.log("sendNotificationToUsers",result);
// return res.send(getSuccessObjectWithLocalization(200,"User Removed From Disappearance Zone","ES-039",data));
    

// }catch(err){
//   return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));// return getErrorObject(501,"Inernal Server error",err);
// }
  
// };

// //Logs
// //22-10-2019 
// //Sprint 31
// //  This Handler intercept 'userAcknowledgedForDisappearance' API
// // This User updated the Disappearance Screen for a user from vd1 to vd2 and update PSAP with real time message.
// userController.userAcknowledgedForDisappearance = async (req, res) => {
//   let event = req.body;
  
//   try{
//     if(event.event_id == undefined || event.user_id == undefined || req.headers == undefined || req.headers['authorization'] == undefined)
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002"));//return getErrorObject(400,"Bad Request");

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     let currentFAU = {};
//     console.log("currentEvent :" ,currentEvent);
//     if(currentEvent.assigned_PSAP_agent_id == "" && getBooleanValue(currentEvent.isHandledByCallCenter) )
//     return res.send(getErrorObjectWithLocalization(400,"Event is in unassigned state.","ES-041"));
//     let result = await eventModel.acknolegdeUserForDisappearance(event.event_id,event.user_id);
//     console.log("result ",result);
//     let payloadToSendToPSAP = {
//       "id":event.user_id,
//       "channel_id":currentEvent.assigned_PSAP_agent_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//             "type":"Vicinity_User_Acknowledge",
//             "obj_id":"",
//             "currentEventId":event.event_id,
//             "vicinity_user_id":event.user_id,
//             "category":"Day By Day",
//             "message":"Event Alert!!",
//             "categoryId":132
//       }
//     };
//     console.log("payloadToSendToPSAP  ",payloadToSendToPSAP);
//     let notificationUSers = [];
//     notificationUSers.push(payloadToSendToPSAP);
//     if(getBooleanValue(currentEvent.isHandledByCallCenter))
//      await sendNotificationToUsers(notificationUSers);
  
//     return res.send(getSuccessObjectWithLocalization(200,"Thanks for acknowledging","ES-040"));
//   }catch(err){
//     console.log("err",err);
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));// return getErrorObject(501,"Internal Server Error");
//   }
  
// };



// //Logs
// //06-01-2020
// //Sprint 33
// //  This function reset change event_status flag to 172(i.e. closed) in MongoDB 
// // closeDisappearedEventInMongoDB = async (eventId,is_user_going_well,is_user_foundback)=>{
// //   const client =await getConnection();
// //  // let eventId = "5d4d3b954b7561a5b1792283";
// //   const collection = client.db("Boris").collection("Events");
// //   return new Promise((resolve, reject) => {
// //     collection.update({"_id" : ObjectId(eventId)},{ $set: { event_status: 172,is_user_going_well:is_user_going_well,is_user_foundback:is_user_foundback}}).then(result => {
// //       if(result)
// //       resolve({ result: result});
// //       else
// //       reject({ _id: null })
// //     });
// //   });
// // }


// function closeDisappearanceEventInLaravel(eventId){
//   let url =CONSTANTS.laravelBaseUrl +CONSTANTS.closeDisappearanceEventInLaravel;
//   console.log('Making call:>>>>>>>>>>>>>>>>',url);
//   return new Promise((resolve, reject) => {
//     let body = {
//      "event_id":eventId
//     }

//     var headers= {
//       //'Authorization': authorization//'Bearer eyJraWQiOiJHaVFQdElSdU9RRUE4WStFQUFmblhQVlM2a1V4WmtVSjdmd0ljWU8rWmlnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NTg4OWIzMC1mMDQ1LTQ2N2ItOWExYy03NWQwZWY2ZjAyYzQiLCJhdWQiOiI3ZWVsdGNkaXR1cjc0NTRyMW1zYmkwMWE1NiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBhM2MxNjAyLTgyMTMtMTFlOS05YTc5LThiOTdlZjUwODE2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU5MTM1MzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9xMHF0NHAwZzMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzU4ODliMzAtZjA0NS00NjdiLTlhMWMtNzVkMGVmNmYwMmM0IiwiZXhwIjoxNTU5MTM4OTkwLCJpYXQiOjE1NTkxMzUzOTAsImVtYWlsIjoidmlwaW4xN0B5b3BtYWlsLmNvbSJ9.NdRKj7InE-pCnUdU5miyv6XbzlMnQAYW2OPUErUrt4Hl4K_6Rz_hOnvn8I6ABf-Ep2omT_2aEd60ZFnuJOMLyp_javFUAtyQPuOBrLrG6TvneuzO9GLHNOI08Ugna-w1D0JBmqseQJl-NF12hMJSs1_vgOp1SNpZx6MMDOJToxeSJEnrJ2SuUZDdR6vp4ef4c348atFqIJMfmgDf523jord0dbg_MezxZPa25XEueyRJM3koi-jFJ5mFFrj3rLOSm-nhPuCmr02Od0NjcbiWv0hJ9CHPdY-vrJPU44BEGqLQ3ans6LoWOfTZVJuMpb2JzoDmn8IshYVnto2w54WoBg'
//      }

//     request.post({url:url,headers:headers, json: body}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('upload failed:'+err);
//      reject(err);
//   }
//   console.log('Upload successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// };

// //Logs
// //06-01-2020
// //Sprint 33
// //  This function set mission_closed_by_launcher to 'True' based on eventId
// //closeDisappearedEventRaisedByLauncher = async (eventId,is_user_going_well,is_user_foundback)=>{
// //   const client =await getConnection();
// //  // let eventId = "5d4d3b954b7561a5b1792283";
// //   const collection = client.db("Boris").collection("Events");
// //   return new Promise((resolve, reject) => {
// //     collection.update({"_id" : ObjectId(eventId)},{ $set: { mission_closed_by_launcher: true,is_user_going_well:is_user_going_well,is_user_foundback,is_user_foundback}}).then(result => {
// //       if(result)
// //       resolve({ result: result});
// //       else
// //       reject({ _id: null })
// //     });
// //   });
// // }


// function getCloseEventInNotificationLambdaUrl(){
//   let value = "Boris-Lambda-Service-dev-closeDisappearanceInNotification";
//   if(CONSTANTS.stage == "QA"){
//     value = "Boris-Lambda-Service-qa-closeDisappearanceInNotification";
//   }else if(CONSTANTS.stage == "prod"){
//     value = "Boris-Lambda-Service-prod-closeDisappearanceInNotification";
//   }
// return value;
// }

// // This Function change event_type to 172 in Boris-Notification-Service
// function closeDisappearanceInNotificationMicroservice(payload){
//   let FunctionName =getCloseEventInNotificationLambdaUrl();// CONSTANTS.stage == "QA" ?"Boris-Lambda-Service-qa-closeDisappearanceInNotification":'Boris-Lambda-Service-dev-closeDisappearanceInNotification';

//     return new Promise((resolve, reject) => {
//     // resolve(payload);
//     var lambda = new AWS.Lambda({'region': CONSTANTS.region});
//     var params = {
//       FunctionName: FunctionName,//'boris-notification-service-dev-updateNotificationOfDisappearance', // the lambda function we are going to invoke
//       InvocationType: 'Event',
//       LogType: 'Tail',
//       Payload: JSON.stringify(payload)
//     };
//     lambda.invoke(params, function(err, data) {
//       if (err) {
//         console.log('Lambda_B err '+ err);
//         reject(err);
//       } else {
//         console.log('Lambda_B said '+ data.Payload);
//         resolve(data);
//       }
//     })
//   });
// }


// // This Function forcefully Stops the step function Execution based on executionArn
// function stopStepFunctionExecution(executionArn,cause =""){
//   var stepfunctions = new AWS.StepFunctions({'region': CONSTANTS.region});
//   return new Promise((resolve, reject) => {
//     var params = {
//       executionArn: executionArn, /* required */
//       cause: cause
//     };
//     stepfunctions.stopExecution(params, function (err, data) {
//       if (err) {console.log(err, err.stack); // an error occurred
//         resolve(err);}
//       else  {  console.log(data);           // successful response
//         resolve(data);}
//     });
//  });
// }


// // Event can be marked closed in two ways:
// // 1.) Event marked closed by PSAP: Mark the event closed in EventDB and then in Laravel service which return all the users who were the part of Event. 
// // We send the Event closed notification in user’s local. And stop the Step function “with Execution ARN of Step function”.
// // 2.) Event Marked closed by Launcher: We update “mission_closed_by_launcher” flag in DB and send a real time Push to PSAP agent but ultimately the Event has to be closed by PSAP agent.
// userController.closeDisappearedEvent = async (req, res) => {
//   let event = req.body;
//   console.log(" closeDisappearedEvent params :" ,event);

//   try{  
//     if(event.event_id == undefined || event.event_id == null || req.headers == undefined || req.headers['authorization'] == undefined)
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002"));

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     let currentFAU = {};
//     console.log("currentEvent :" ,currentEvent);
//     // Now the launcher can closed unassigned events as well
//     // if(currentEvent.assigned_PSAP_agent_id == "")
//     // return getSuccessObjectWithLocalization(400,"Event is in unassigned state.","ES-042");
//     let is_user_going_well = getBooleanValue(event.is_user_going_well);
//     let is_user_foundback = getBooleanValue(event.is_user_foundback);
//     if(getBooleanValue(event.is_closed_by_PSAP) || !getBooleanValue(currentEvent.isHandledByCallCenter)){ // Either PSAP closed missio or Launcher closed Free Event
//       let MongoDBResult = await eventModel.closeDisappearedEventInMongoDB(event.event_id,is_user_going_well,is_user_foundback);
//       let laravelResult = await closeDisappearanceEventInLaravel(event.event_id);
//       console.log("laravelResult ",laravelResult.users);
//       let users = (laravelResult.users!=undefined && laravelResult.users!=null ) ?laravelResult.users:[];
//   // We will only push Close Event Detail to event_id Channel
//   await Promise.all(laravelResult.users.map(async (laravelUser)=>{
//     let notificationMessage = `${currentEvent.name}'s Disappearence Event is closed`; //"E-N-003";
//     notificationMessage = parseMessageWithName(currentEvent.name,laravelUser.message);
//     console.log("chenge on the go >>",notificationMessage);
//     let notificationToSentFromPubnub = {
//       "message":notificationMessage,//`${currentEvent.name}'s Disappearence Event is closed`, //"E-N-003"
//       "type":"Disappearance_Event_Closed",
//       "obj_id":event.event_id,
//       "name":currentEvent.name,
//       "is_user_foundback":event.is_user_foundback,
//       "reporter_user_id":currentEvent.reporter_user_id
//      // "event_details":event
//     }
//            var publishConfig = {
//       channel : laravelUser.user_id, // changed channel id to id based on architecture changes.
//       message : {  
//         "pn_apns":{  
//            "aps":{  
//               "alert":notificationToSentFromPubnub.message
//            },
//            "data":notificationToSentFromPubnub,
//            "pn_push": [{
//             "targets": [{
//               "environment": CONSTANTS.iOSNotificationEnviroment,
//               "topic":CONSTANTS.notificationTopic// "com.pikotechnologies.borisapp"
//             }],
//             "version": "v2"
//           }]
//         },
//         "pn_gcm":{  
//            "data":notificationToSentFromPubnub
//         }
//      }
//   };

  
//   console.log("publishConfig",JSON.stringify(publishConfig));
//   let result2 = await sendNotification(publishConfig);
//   }));

//   // Get launcher Details reporter_user_id
//   if(currentEvent.reporter_user_id && getBooleanValue(currentEvent.isHandledByCallCenter)){
// console.log("SEnding Notification to Launcher",currentEvent.reporter_user_id);
//     // SEnding Notification to Launcher
//     let getNotificationMessageBasedOnUserIdResponse =  await getNotificationMessageBasedOnUserId(currentEvent.reporter_user_id,"E-N-003")
//     console.log("laravelResponse",getNotificationMessageBasedOnUserIdResponse);
//     let getNotificationMessageBasedOnUserIdResponseValue = JSON.parse(getNotificationMessageBasedOnUserIdResponse);
//     let titleForLauncher = `${currentEvent.name}'s Disappearence Event is closed`; //"E-N-003";
//     if(getNotificationMessageBasedOnUserIdResponseValue && getNotificationMessageBasedOnUserIdResponseValue.data && getNotificationMessageBasedOnUserIdResponseValue.data.message){
//      //titleForLauncher= getNotificationMessageBasedOnUserIdResponseValue.data.message;
//      titleForLauncher = parseMessageWithName(currentEvent.name,getNotificationMessageBasedOnUserIdResponseValue.data.message);
//     }
//     let notificationToSentFromPubnub = {
//      "message":titleForLauncher,//`${currentEvent.name}'s Disappearence Event is closed`, //"E-N-003"
//      "type":"Disappearance_Event_Closed",
//      "obj_id":event.event_id,
//      "name":currentEvent.name,
//      "is_user_foundback":event.is_user_foundback,
//      "reporter_user_id":currentEvent.reporter_user_id
//     // "event_details":event
//    }
//           var publishConfig = {
//      channel : currentEvent.reporter_user_id, // changed channel id to id based on architecture changes.
//      message : {  
//        "pn_apns":{  
//           "aps":{  
//              "alert":notificationToSentFromPubnub.message
//           },
//           "data":notificationToSentFromPubnub,
//           "pn_push": [{
//            "targets": [{
//              "environment": CONSTANTS.iOSNotificationEnviroment,
//              "topic":CONSTANTS.notificationTopic// "com.pikotechnologies.borisapp"
//            }],
//            "version": "v2"
//          }]
//        },
//        "pn_gcm":{  
//           "data":notificationToSentFromPubnub
//        }
//     }
//    };

   
//    console.log("publishConfig",JSON.stringify(publishConfig));
//    let result2 = await sendNotification(publishConfig);
//   }



//       if(currentEvent.ExecutionARN)
//       {
//         let stopStepFunctionResult = await stopStepFunctionExecution(currentEvent.ExecutionARN,"Disappeared Event is closed by PSAP");
//         console.log("stopStepFunctionResult ",stopStepFunctionResult);
//       }
//       if(currentEvent.notification_id){
//         let event_details = Object.assign({},currentEvent,{event_status:172});
//         let closeDisappearanceInNotificationMicroserviceResult =  await closeDisappearanceInNotificationMicroservice({event_details:event_details});
//         console.log("closeDisappearanceInNotificationMicroserviceResult  ",closeDisappearanceInNotificationMicroserviceResult);
//       }
//       let response ={isHandledByCallCenter:currentEvent.isHandledByCallCenter };

//       return res.send(getSuccessObjectWithLocalization(200,"Event is Closed","ES-028",response));//"ES-043");
//     }else{
//       let closeDisappearedEventRaisedByLauncherDBResult = await eventModel.closeDisappearedEventRaisedByLauncher(event.event_id,is_user_going_well,is_user_foundback);
//         console.log("closeDisappearedEventRaisedByLauncherDBResult");
    
//       let notificationToSentFromPubnub = {
//         "message":`${currentEvent.name}'s Disappearence Event is closed`,
//         "currentEventId":event.event_id,
//         "category_id":"135",
//         is_user_going_well:is_user_going_well,
//         is_user_foundback:is_user_foundback

//        // "event_details":event
//       }

//       let channelId = '';
//       if(currentEvent.assigned_PSAP_agent_id == "")
//       channelId = currentEvent.PSAP_center_id;
//       else
//       channelId = currentEvent.assigned_PSAP_agent_id;

//       let payload = {
//        channel : channelId,
//        message : {
//          type:"Disappearance_Event_Closed_By_Launcher",
//          "currentEventId":event.event_id,
//          is_user_going_well:is_user_going_well,
//          is_user_foundback:is_user_foundback,
//          message:notificationToSentFromPubnub
//        }
//    }
//     console.log("publishConfig",JSON.stringify(payload));
  
      
//        let result2 = await sendNotification(payload);
//       return res.send(getSuccessObjectWithLocalization(200,"Event Closed Request has been raised","ES-044"));
//     }
 
    
   
//   }catch(err){
//     console.log("err",err);
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));//return getErrorObject(501,"Internal Server Error");
//   }
  
// };



// //Logs
// //07-01-2020
// //Sprint 33
// //  This Handler intercept 'changeVicinityArea' API and changes the vicinity Area of Disappeared Event.
// // It takes distance in Meters, and sends Silent Puch to all the users who are part of the Event.
// userController.changeVicinityArea = async (req, res) => {
//   let event = req.body;
//   console.log(" changeVicinityArea params :" ,event);
//   try{
//     if(event.event_id == undefined || event.event_id == null || event.distance == undefined || event.distance == null || req.headers == undefined || req.headers['authorization'] == undefined)
//     return res.send(getErrorObjectWithLocalization(401,"Bad Request","G-002"));//return getErrorObject(400,"Bad Request");

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     let currentFAU = {};
//     console.log("currentEvent :" ,currentEvent);
//     if(currentEvent.assigned_PSAP_agent_id == "")
//     return res.send(getErrorObjectWithLocalization(400,"Event is in unassigned state.","ES-045"));
//     let distance = parseInt(event.distance);
//     let changeViciityAreaInDisappearedEventInMongoDBrDBResult = await eventModel.changeViciityAreaInDisappearedEventInMongoDB(event.event_id,distance);
// //    console.log("changeViciityAreaInDisappearedEventInMongoDB ",changeViciityAreaInDisappearedEventInMongoDB);

//   let notificationToSentFromPubnub = {
//     "message":`Event range has been changed`,
//     "type":"Vicinity_Zone_Changed",
//     "obj_id":event.event_id,
//     "range":distance,
//     "category_id":"135",
//     "location":currentEvent.location
//    // "event_details":event
//   }
//   let payload = {
//     channel : event.event_id,
//     message :notificationToSentFromPubnub
//  }

// console.log("publishConfig",JSON.stringify(payload));

//    let result2 = await sendNotification(payload);
//   return res.send(getSuccessObjectWithLocalization(200,"Event range has been changed","ES-045"));
    
   
//   }catch(err){
//     console.log("err",err);
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));//return getErrorObject(501,"Internal Server Error");
//   }
  
// };

// //Logs
// //08-01-2020
// //Sprint 33
// //  This Handler intercept 'pauseOrResumeLocationUpdates' API and sends to realtime push to disappeared user to pause/start the GPS lacation.
// userController.pauseOrResumeLocationUpdates = async (req, res) => {
//   let event = req.body;
//   console.log(" inside event :" ,event);
//   try{
//     if(event.event_id == undefined || event.event_id == null ||event.pause == undefined || event.pause == null )
//     return res.send(getErrorObject(400,"Bad Request"));

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     console.log("currentEvent :" ,currentEvent);
//     if(currentEvent.user_id == undefined || currentEvent.user_id == null )
//     return res.send(getSuccessObjectWithLocalization(404,"No Event found with the given id","ES-046"));

//     if(currentEvent.assigned_PSAP_agent_id == "")
//     return res.send(getSuccessObjectWithLocalization(400,"Event is in unassigned state.","ES-047"));
//     let is_disappeared_user_tracking_on = getBooleanValue(event.pause);
//     let pauseOrResumeLocationInMongoDBrDBResult = await eventModel.pauseOrResumeLocationInMongoDB(event.event_id,!is_disappeared_user_tracking_on);
//     console.log("pauseOrResumeLocationInMongoDBrDBResult ",pauseOrResumeLocationInMongoDBrDBResult);

//   let notificationToSentFromPubnub = {
//     "message":`GPS status Changed.`,
//     "type":"Live_GPS_tracking_Update",
//     "obj_id":event.event_id,
//     "assigned_PSAP_agent_id":currentEvent.assigned_PSAP_agent_id,
//     "gps_tracking_status":!is_disappeared_user_tracking_on,
//    // "event_details":event
//   }
 
//   let payload = {
//    channel : currentEvent.user_id,
//    message : {  
//     "pn_apns":{  
//        "aps":{  
//         "content-available":1
//        },
//        "data":notificationToSentFromPubnub,
//        "pn_push": [{
//         "targets": [{
//           "environment": CONSTANTS.iOSNotificationEnviroment,
//           "topic": CONSTANTS.notificationTopic//"com.pikotechnologies.borisapp"
//         }],
//         "version": "v2"
//       }]
//     },
//     "pn_gcm":{  
//        "data":notificationToSentFromPubnub
//     }
//  }
// }



// console.log("publishConfig",JSON.stringify(payload));

//    let result2 = await sendNotification(payload);
//    let message = is_disappeared_user_tracking_on == true ?"Disappeared User's Location update has been paused":"Disappeared User's Location update has been resumed";
//    let response_messge_code = is_disappeared_user_tracking_on == true ?"ES-048":"ES-049";
//    return res.send(getSuccessObjectWithLocalization(200,message,response_messge_code));
    
   
//   }catch(err){
//     console.log("err",err);
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));//  return getErrorObject(501,"Internal Server Error");
//   }
// };


// //This Function Uploads data to S3 Bucket
// function getPostSingedUrl(params){
//   return new Promise((resolve, reject) => {
//     console.log("uploading image",params);
//     let s3Bucket = new AWS.S3({apiVersion: '2006-03-01', region: 'eu-west-3'});// getS3BucketInstance();// Getting s3 instance 
//     s3Bucket.createPresignedPost(params, function (err, data) {
//       //handle error
//       if (err) {
//         console.log("error in s3",err);
//         reject(err);
//       }
//       if (data) {
//         console.log("Bucket Created",err);
//         resolve(data);
//       }
//     });
// });
// }

// function getStage(){
//   let value = "dev";
//   if(CONSTANTS.stage =="QA"){
//     value = 'qa';
//   }else if(CONSTANTS.stage =="prod"){
//     value = 'prod';
//   }
//   return value;
// }


// // This Module create singed url for below uploads:

// // 1.) Manual: Manual Audio recordings.
// // 2.) Disappearance/ Incident.
// // 3.) Notification Images uploaded by Admin.

// // All the above details are uploaded to “boris-user-details” with different prefix.


// userController.getSecuredURLToUploadAudio = async (req, res) => {
//   let event = req.body;
//   console.log(" inside event :" ,event);
//   try{

//     if(event.recording_type == undefined || req.headers == undefined || req.headers['authorization'] == undefined )
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002"));//return getErrorObject(400,"Bad Request");

//     if((event.recording_type == "Disappearance" || event.recording_type == "Incident") && (event.event_id == undefined || event.event_id == null || event.event_id == ''))
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002"));//return getErrorObject(400,"Bad Request");
    

//     let authorization = req.headers['authorization'];
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1];
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);
//     console.log("parsedUserDate",parsedUserDate);
//     let userGroup = parsedUserDate["cognito:groups"]!=undefined ?parsedUserDate["cognito:groups"][0]:"BorisUser";
//     console.log("userGroup",userGroup);
//     console.log("parsedUserDate.sub",parsedUserDate.sub);

//     let region = getStage();// CONSTANTS.stage =="QA"?'qa':'dev';
//     let key = `${region}/event_recording/${event.event_id}`

//     let params = {
//       Expires: 3600, // 
//       Bucket: "boris-user-details", //
//       Conditions: [["content-length-range", 100, 10000000]], // 100Byte - 10MB
//       Fields: {
//         "Content-Type": "audio/mpeg",//"image/jpeg",Amazon S3/boris-user-details/dev/event_recording
//         key:key//`${region}/event_recording/${event.event_id}`
//       }
//     };

//     if( event.recording_type == "Manual"){
//       let user = {
//         user_id:parsedUserDate.sub
//       }
//       let manual_audio_recording = await get_manual_recordings(user);

      
//       if(manual_audio_recording && manual_audio_recording.length>=2)
//       return res.send( getSuccessObjectWithLocalization(200,"Recording Limit exceded","ES-061",{
//         limitExceeded:true
//       }));
      
//       params.Fields.key = `${region}/user/${parsedUserDate.sub}/Recording/${Date.now()}`;
//       console.log("In manual ",params);
//     }else if(event.recording_type == "Disappearance"){
//       params.key = `${region}/event_recording/${event.event_id}`;
//     }else if(event.recording_type == "Incident"){
//       params.key = `${region}/event_recording/${event.event_id}`;
//     }else if(event.recording_type == "admin"){
//       key = `${region}/notification_images/${event.image_name}`;
//       params = {
//         Expires: 3600, // 
//         Bucket: "boris-user-details", //
//         ACL: 'public-read',
//         Conditions: [["content-length-range", 100, 10000000]], // 100Byte - 10MB
//         Fields: {
//           "Content-Type": event.image_type,//"image/jpeg",//"image/jpeg",Amazon S3/boris-user-details/dev/event_recording
//           ACL: 'public-read',
//           key:key//`${region}/event_recording/${event.event_id}`
//         }
      
//       };
//     }else if(event.recording_type == "PSAP_screen_recording"){
//       key = `${region}/psap_screen_recordings/${event.image_name}`;
//       params = {
//         Expires: 3600, // 
//         Bucket: "boris-user-details", //
//       //  ACL: 'public-read',
//      //   Conditions: [["content-length-range", 100, 10000000]], // 100Byte - 10MB
//         Fields: {
//           "Content-Type": event.image_type,//"image/jpeg",//"image/jpeg",Amazon S3/boris-user-details/dev/event_recording
//      //     ACL: 'public-read',
//           key:key//`${region}/event_recording/${event.event_id}`
//         }
      
//       };
//     }else {
//       return res.send(getErrorObject(400,"Invalid recording_type parameter"));
//     }

//     console.log("  final Param  >>>>>>",params);
//     console.log("  recording_type  >>>>>>",event.recording_type);

  
//     let result = await getPostSingedUrl(params);
//     result.limitExceeded=false;

//   return res.send(getSuccessObjectWithLocalization(200,"Here is the Presigned URL","ES-052",result));

   
//   }catch(err){
//     console.log("err",err);
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));//return getErrorObject(501,"Internal Server Error");
//   }
  
// };

// //Logs
// //12-01-2020
// //Sprint 33
// //  This module return below information based on Event Ids and user id:
// // 1.) For Incident Events: We return Event_id and Event_type
// // 2,) For disappearance Events : We return event_id,location, assigned_PSAP_agent_id, assigned_PSAP_agent_name, in_vicinity_zone and is_acknowledge. 
// userController.getEventsBasedOnIds = async (req, res) => {
 
//   try{
//     console.log(" getEventsBasedOnIds params:",req);
// let event_ids = JSON.parse(req.param("event_ids"));
// let user_id = req.param("user_id");

//     let eventIds = event_ids.map((event)=>{
//       return ObjectId(event)
//     });

//     let data = await eventModel.getEventsBasedOnIdsFromMongoDB(eventIds);
//     let events = data.map((e)=>{
//       if(e.event_type == 163){
//         let is_acknowledge = false;
//         let in_vicinity_zone = false;
//         e.users_in_visinity.map((u)=>{
//           if(u.user_id == user_id){
//             in_vicinity_zone = true;
//             if(u.isAcknoledged == true){
//               is_acknowledge = true;
//             }           
//           }
//         })

//           return {
//             event_id:e._id,
//             location:e.location,
//             assigned_PSAP_agent_id:e.assigned_PSAP_agent_id,
//             assigned_PSAP_agent_name:e.assigned_PSAP_agent_name,
//             vicinity_zone:e.vicinity_zone,
//             event_type:163,
//             in_vicinity_zone:in_vicinity_zone,
//             is_acknowledge:is_acknowledge,
//             isHandledByCallCenter:e.isHandledByCallCenter,  
//             is_unknown_location:getBooleanValue(e.is_unknown_location)      
//             }
//       }else{
//         return {
//           event_id:e._id,
//           event_type:162
//           }
//       }
//     });
//     console.log("events",events);
//        return res.send(getSuccessObjectWithLocalization(200,"Events Found","ES-053",events));

//   }catch(err){
//     console.log("err",err);
//     return res.send(getErrorObjectWithLocalization(501,"something went wrong","G-001",err));// return getErrorObject(501,"Internal Server Error");
//   }
  
// };


// function getautoSaveRecordingURL(){
//   let value = "dev/event_recording/";
//   if(CONSTANTS.stage =="QA"){
//     value = 'qa/event_recording/';
//   }else if(CONSTANTS.stage =="prod"){
//     value = 'prod/event_recording/';
//   }
//   return value;
// }

// //Logs
// //01-27-2020
// //Sprint 34
// //  This Function returns Auto_saved recordings from S3 based on Event.
// function get_auto_save_recording(event) {
//   return new Promise((resolve, reject) => {
//      var s3 = getS3BucketInstance();// new AWS.S3();get_auto_save_recording
//        // fetch auto save audio recordings
//        let Prefix =getautoSaveRecordingURL();// CONSTANTS.stage == "QA" ?`qa/event_recording/`:`dev/event_recording/`;
//        var params = {
//          Bucket: 'boris-user-details', /* required */
//          Prefix:Prefix// `dev/event_recording/`  // Can be your folder name
//        };
//        s3.listObjectsV2(params, function(err, data) {
//          if (err) { 
//              console.log(err, err.stack); // an error occurred
//             reject(err.stack);
//          }
//          else  {
//            var auto_save_audio_recording = [];
//             data.Contents.forEach( function(element) {
//                element.fileName =  element.Key.substring(element.Key.lastIndexOf('/')+1);
            
//                if(element.fileName == event.event_id){
//                 console.log("element.fileName >>",element.fileName);
//                   auto_save_audio_recording.push(element);
//                }
            
//             })
//             console.log("Prefix >>>>>>>>>>>>>>>>>>>>>>>",Prefix);
//            resolve(auto_save_audio_recording);
//          } 
//        });

//    });
// }

// //Logs
// //01-27-2020
// //Sprint 34
// //  This Function returns Manual recordings(last 24 hours from request raised) from S3 based on Event.
// function get_manual_recordings(event) {
//  return new Promise((resolve, reject) => {

//      var s3 = getS3BucketInstance();//new AWS.S3();

//        //fetch Manual audio recordings
//        let Prefix = `${getStage()}/user/${event.user_id}/Recording/`;
//        var params = {
//          Bucket: 'boris-user-details', /* required */
//          Prefix: Prefix//`dev/user/${event.user_id}/Recording/`  // Can be your folder name
//        };

//        s3.listObjectsV2(params, function(err, data) {
//          if (err){ 
//            console.log(err, err.stack); // an error occurred
//             reject(err.stack);
//          }
//          else {
           
//            //converting current date with moment using offset
//            var currentDate =  moment(new Date()).utcOffset(parseInt(-(event.dateTimeZone))).format('YYYY-MM-DD HH:mm:ss');
//            //calculating 24 old date with moment using offset
//            var beforeDate = moment(new Date()).utcOffset(parseInt(-(event.dateTimeZone))).subtract(24,"hours").format('YYYY-MM-DD HH:mm:ss');
           
//             var LastModifiedDate;
//              var manual_audio_recording = [];
//             data.Contents.forEach( function(element) {
//              LastModifiedDate ="";
//              LastModifiedDate = moment(new Date(element.LastModified)).utcOffset(parseInt(-(event.dateTimeZone))).format('YYYY-MM-DD HH:mm:ss');
//              //check if the last modified date is between the before date and current date
//              if(moment(LastModifiedDate).isBetween(beforeDate, currentDate)){
//                  element.fileName  =  element.Key.substring(element.Key.lastIndexOf('/')+1);
//                 manual_audio_recording.push(element);
//              }
//             })
//              resolve(manual_audio_recording);
//          }
//        });
//  });
// }

// //Logs
// //12-27-2020
// //Sprint 34
// //  This Handler intercept 'getDisappearedUserRecordings' API and returns Disappeared user recording (Last 24 hours mannual recording and Event Automatic Recording).
// userController.getDisappearedUserRecordings = async (req, res) => {
//   let event = {
//      event_id: req.param("event_id"),
//   user_id: req.param("user_id"),
//   dateTimeZone: req.param("dateTimeZone")
//  }
//   console.log(" inside event :" ,event);
//   try{
//     console.log("event", event);

//     var eventDetails = {
//       event_id: event.event_id,//'5daef306cae53b429466ed64',
//       user_id: event.user_id,//'bd110f6a-f3fa-40c6-b8b8-202b5e0f301e',
//       dateTimeZone:event.dateTimeZone// -330
//     };

//     // if((event.event_id == undefined || event.event_id == "") && (event.user_id == undefined || event.user_id == ""))
//     //   return getErrorObject(400, "User Id & event Id is required");

//     var audio_recordings = {
//       manual_audio_recording: [],
//       auto_save_audio_recording: []
//     };
    
//     audio_recordings.manual_audio_recording = await get_manual_recordings(eventDetails);
//     audio_recordings.auto_save_audio_recording = await get_auto_save_recording(eventDetails);

//     console.log("audio_recordings", audio_recordings);
//     return res.send(getSuccessObjectWithLocalization(200,"User's Recordings","ES-054",audio_recordings));
   
//   }catch(err){
//     console.log("err",err);
//     return res.send(getErrorObjectWithLocalization("400","Bad Request","G-002",err));//return getErrorObject(501,"Internal Server Error",err);
//   }
  
// };




// function getTwilioAccessToken(userId,roomId){
//   const twilioAccountSid ="AC311c6af08e57bbc610f12e2b632bdfac";// 'AC6bbd890c13947d7c8dc07f05aa72b01c';
// const twilioApiKey = "SK0c18eb58ac0746dc8177e2a52a39c43c";// "'SK86b1f22966bea0fc51b4b1c01d02a424';
// const twilioApiSecret = "A76kt5FPsm6lhoCmU2RACSedooVKbDUm";//'sV3DctvtnoGrhsJVOODL5U5zvppHB6ia';
// // Create Video Grant
// const videoGrant = new VideoGrant({
//   room: roomId,
// });

// // Create an access token which we will sign and return to the client,
// // containing the grant we just created
// const token = new AccessToken(
//   twilioAccountSid,
//   twilioApiKey,
//   twilioApiSecret,
//   {identity: userId}
// );
// token.addGrant(videoGrant);

// // Serialize the token to a JWT string
// console.log(token.toJwt());
// return token.toJwt();
// }


// function getListOfConnectedParticipantInRoom(roomId,psap_agent__id){
//   console.log("roomId code changed>>",roomId);
//   console.log("psap_agent__id",psap_agent__id);
// //   const twilioAccountSid = 'AC6bbd890c13947d7c8dc07f05aa72b01c';
// //   const twilioApiKey = 'SK86b1f22966bea0fc51b4b1c01d02a424';
// // const twilioApiSecret = 'sV3DctvtnoGrhsJVOODL5U5zvppHB6ia';

// const twilioAccountSid ="AC311c6af08e57bbc610f12e2b632bdfac";// 'AC6bbd890c13947d7c8dc07f05aa72b01c';
// const twilioApiKey = "SK0c18eb58ac0746dc8177e2a52a39c43c";// "'SK86b1f22966bea0fc51b4b1c01d02a424';
// const twilioApiSecret = "A76kt5FPsm6lhoCmU2RACSedooVKbDUm";//'sV3DctvtnoGrhsJVOODL5U5zvppHB6ia';



// var client = new Twilio(twilioApiKey, twilioApiSecret, {accountSid: twilioAccountSid});
// return new Promise((resolve, reject) => {
//   try{
//   client.video.rooms(roomId)
//  // .participants.get(psap_agent__id)
//   .fetch()
//   .then(participant => {
//     console.log(" code changed >>>>",participant);
//     resolve({ participant: participant });
//   //  console.log(">>>>",participant);
//   },(err)=>{
//     resolve({ participant: {} });
//   });
// }catch(ex){
//   console.log(ex)
//   reject({ ex: ex });
// }
// });

// }


// // insertMissedVideoCallForEvent  = async (eventId,callDetails) =>{
// //   const client =await getConnection();
// //   const collection = client.db("Boris").collection("Events");



// //   return new Promise((resolve, reject) => {
// //     collection.update({"_id" : ObjectId(eventId)},{ $push: { missed_calls: callDetails }}).then(result => {
// //      console.log("result".result);
// //      if(result)
// //      resolve({ result: result});
// //      else
// //      reject({ _id: null })
// //    });
// //  });


// // }



// // This Module creates Twilio Token for both the Caller and callee based on Below cases:

// // 1.) When caller is PSAP: We send the Notification to the User in User’s locale along with Twillio access token and also return a Twilio token for PSAP user so that they can connect on a video call.
// // 2.) When caller is User: If PSAP user is not on another call we sends a real time Push to PSAP agent along with twilio token and also return twilio token to the User. 
// // If PSAP is already on another call we insert the call in EventDB as a missed call and return “PSAP is busy at the moment” to the user.
// userController.getTwilioAccessTokenForVideoCall = async (req, res) => {
//   let event = req.body;
//   try{

//     // Used when generating any kind of tokens
//         console.log("event >>  ",event);
//       let authorization = req.headers['authorization'];
//       var tokenArray  = authorization.split(' ');
//       console.log(tokenArray);
//       let accessToken= tokenArray[1]
//       let claims = decodeAccessToken(accessToken); //JSON.parse(decodedData);
//       let userIdOfCaller = claims.sub; 
//       let groupUserBelongsTo = (claims!=null && claims!=undefined && claims['cognito:groups']!=undefined && claims['cognito:groups'].length!=0) ? claims['cognito:groups'][0]:"BorisUser";
    
    
//     let tokenForCaller = "";// getTwilioAccessToken(userId,eventId);
//     let tokenForCalle = "";
//     let eventId= event.event_id;
    
//     let userIdOfCalle = "";
    
    
//     let notificationToSentFromPubnub = {}
//     if(groupUserBelongsTo == "PSAPUsers"){ // Call initiated by PSAP
    
    
//       tokenForCaller = getTwilioAccessToken(userIdOfCaller,eventId);
//       userIdOfCalle = event.anotherUserId;
//       tokenForCalle = getTwilioAccessToken(userIdOfCalle,eventId);
//       let incommingCallMessage = "You have an incoming video call from PSAP agent, please connect.";
//       let getNotificationMessageBasedOnUserIdResponse =  await getNotificationMessageBasedOnUserId(userIdOfCalle,"E-N-007")
//       console.log("laravelResponse",getNotificationMessageBasedOnUserIdResponse);
//       let getNotificationMessageBasedOnUserIdResponseValue = JSON.parse(getNotificationMessageBasedOnUserIdResponse);
//       let titleForLauncher = `${event.name}'s Disappearence Informations Updated`; //"E-N-003";
//       if(getNotificationMessageBasedOnUserIdResponseValue && getNotificationMessageBasedOnUserIdResponseValue.data && getNotificationMessageBasedOnUserIdResponseValue.data.message){
//       //  parseMessageWithName(event.name,laravelUser.message);
//       incommingCallMessage= parseMessageWithName(event.name,getNotificationMessageBasedOnUserIdResponseValue.data.message); //;
//       }
    
    
    
//        notificationToSentFromPubnub = {
//         "message":incommingCallMessage,//notification.notification.title,
//         "type":"INCOMING_VIDEO_CALL",
//         "event_id":eventId,
//         "accessToken_to_join_call":tokenForCalle,
//         "PSAP_agent_name":event.PSAP_agent_name
//       }
//       console.log("notificationToSentFromPubnub",notificationToSentFromPubnub);
//         let publishConfig = {
//       channel : userIdOfCalle, // changed channel id to id based on architecture changes.
//       message : {  
//         "pn_apns":{  
//            "aps":{  
//               "alert":notificationToSentFromPubnub.message
//             //  "sound": "def.wav"
//            },
//            "data":notificationToSentFromPubnub,
//            "pn_push": [{
//             "targets": [{
//               "environment": CONSTANTS.iOSNotificationEnviroment,
//               "topic":CONSTANTS.notificationTopic// "com.pikotechnologies.borisapp"
//             }],
//             "version": "v2"
//           }]
//         },
//         "pn_gcm":{  
//            "data":notificationToSentFromPubnub
//         }
//      }
//     };
    
//     console.log("publishConfig >>> ",JSON.stringify(publishConfig));
    
//      let result2 = await sendNotification(publishConfig);
    
//     }else if(groupUserBelongsTo == "BorisUser"){ // Call initiated by boris user
    
    
//       let currentEvent = await eventModel.getEventBasedOnId(eventId);
//         //  let currentEvent = JSON.parse(currentEventResponse);
//         //  console.log("currentEvent.data >> ",currentEvent.data);
//         //  if(currentEvent.response_code == 200 && currentEvent.data && currentEvent.data.assigned_PSAP_agent_id && currentEvent.data.event_status){
//         //   console.log("parsing data ",currentEvent.data);
//         //   currentEvent = currentEvent.data;
//         //  }else{
//         //    //return Error
//         //    getErrorObject(501,"No Event Found");
//         //  }
//          let PSAPassignedEvents = await eventModel.getEventsbasedOnPSAPId(currentEvent.assigned_PSAP_agent_id,169)// all asigned events
//          let isPSAPAlreadyOnCall =false;
//          let missedCall = {};
//          console.log("PSAPassignedEvents >> ",JSON.stringify(PSAPassignedEvents));
//          if(PSAPassignedEvents && PSAPassignedEvents.data && PSAPassignedEvents.data.length!=0){
//          await Promise.all( PSAPassignedEvents.data.map( async (e)=>{
//           let participents = await getListOfConnectedParticipantInRoom(e._id,currentEvent.assigned_PSAP_agent_id);
//           if(participents && participents.participant && participents.participant.sid){
//             missedCall = {
//               userId:userIdOfCaller,
//               name:event.callerName,
//               image:event.callerImage,
//               time:Date.now()
//             }
//             isPSAPAlreadyOnCall = true;
//           }
//           })
//          );
//         }
//         //  let participents = await getListOfConnectedParticipantInRoom(eventId,currentEvent.assigned_PSAP_agent_id);
//         //  console.log("participents !!!! >>>>",participents);
//          if(isPSAPAlreadyOnCall){
    
//          let result =  await eventModel.insertMissedVideoCallForEvent(eventId,missedCall);
//           notificationToSentFromPubnub = {
//             "message":"You have got a missed call",//notification.notification.title,
//             "type":"MISSED_VIDEO_CALL",
//             "event_id":eventId,
//             "caller_user_id":userIdOfCaller,
//             "callerImage":event.callerImage,
//             "callerName":event.callerName
//           }
//           console.log("notificationToSentFromPubnub",notificationToSentFromPubnub);
//           let publishConfig = {
//         channel : currentEvent.assigned_PSAP_agent_id, // changed  channel id to id based on architecture changes.
//         message:notificationToSentFromPubnub
//         };
        
//         console.log("publishConfig >>> ",JSON.stringify(publishConfig));
        
//         let result2 = await sendNotification(publishConfig);
//        // return getSuccessObject(200,"PSAP Agent is busy at the moment",{token:"",is_PSAP_already_on_call:true});
//         return res.send(getSuccessObjectWithLocalization(200,"PSAP agent is on another call. Please try again later.","ES-056",{token:"",is_PSAP_already_on_call:true}));
//          }
//       tokenForCaller = getTwilioAccessToken(userIdOfCaller,eventId);
//       userIdOfCalle = currentEvent.assigned_PSAP_agent_id;
//       tokenForCalle = getTwilioAccessToken(userIdOfCalle,eventId);
//        notificationToSentFromPubnub = {
//         "message":"You have an incomming call",//notification.notification.title,
//         "type":"INCOMING_VIDEO_CALL",
//         "event_id":eventId,
//         "caller_user_id":userIdOfCaller,
//         "accessToken_to_join_call":tokenForCalle,
//         "callerImage":event.callerImage,
//         "callerName":event.callerName,
//         "accidentUserName":event.accidentUserName
//       }
//       console.log("notificationToSentFromPubnub",notificationToSentFromPubnub);
//       let publishConfig = {
//     channel : userIdOfCalle, // changed channel id to id based on architecture changes.
//     message:notificationToSentFromPubnub
//     };
    
//     console.log("publishConfig >>> ",JSON.stringify(publishConfig));
    
//     let result2 = await sendNotification(publishConfig);
    
//     }
    
    
//     return res.send(getSuccessObject(200,"Twilio Access Token",{token:tokenForCaller,"is_PSAP_already_on_call":false}));
//     }catch(err){
//       console.log("error   >>>> ",err);
//         return res.send(getErrorObject(501,"Someting went wrong",err));
//     }
// }


// userController.rejectVideoCall = async (req, res) => {
//   let event = req.body;
//   try{

//     // Used when generating any kind of tokens
    
//       let authorization = req.headers['authorization'];
//       var tokenArray  = authorization.split(' ');
//       console.log(tokenArray);
//       let accessToken= tokenArray[1]
//       let claims = decodeAccessToken(accessToken); //JSON.parse(decodedData);
//       let userIdOfCaller = claims.sub; 
//       let groupUserBelongsTo = (claims!=null && claims!=undefined && claims['cognito:groups']!=undefined && claims['cognito:groups'].length!=0) ? claims['cognito:groups'][0]:"BorisUser";
    
    
//     let tokenForCaller = "";// getTwilioAccessToken(userId,eventId);
//     let tokenForCalle = "";
//     let eventId= event.event_id;
    
//     let userIdOfCalle = "";
    
    
//     let notificationToSentFromPubnub = {
    
//     };
//     if(groupUserBelongsTo == "PSAPUsers"){ // Call initiated by PSAP
//       userIdOfCalle = event.anotherUserId;
//       let NotificationToBeSent = {
//         notification_type:"SILENT",
//         channel_id:userIdOfCalle,
//         payload:{
//           "message":"You have an incomming call",//notification.notification.title,
//           "type":"REJECT_VIDEO_CALL",
//           "event_id":eventId
//         }
//       };
//       let notificationToSendFromPubnub =  buildNotificationObject(NotificationToBeSent);
//              console.log("notificationToSendFromPubnub");
//             // console.log(notificationToSendFromPubnub);
//              console.log(JSON.stringify(notificationToSendFromPubnub));
//               await sendNotification(notificationToSendFromPubnub)
//     }else if(groupUserBelongsTo == "BorisUser"){ // Call initiated by boris user
    
    
//       let currentEvent = await eventModel.getEventBasedOnId(eventId);

//       userIdOfCalle = currentEvent.assigned_PSAP_agent_id;
    
//       let NotificationToBeSent = {
//         "message":"You have an incomming call",//notification.notification.title,
//         "type":"REJECT_VIDEO_CALL",
//         "event_id":eventId
//       };
//       let notificationToSendFromPubnub =   {
//         channel : userIdOfCalle, // changed  channel id to id based on architecture changes.
//         message:NotificationToBeSent
//         };
        
//              console.log("notificationToSendFromPubnub");
//             // console.log(notificationToSendFromPubnub);
//              console.log(JSON.stringify(notificationToSendFromPubnub));
//               await sendNotification(notificationToSendFromPubnub)
//     }
    
    
    
    
    
    
//     return res.send(getSuccessObject(200,"Call Declined",{}));
//     }catch(err){
//       console.log("error   >>>> ",err);
//         return res.send(getErrorObject(501,"Someting went wrong",err));
//     }
// }




// userController.getAssignedPSAPCenterByEventId = async (req, res) => {
//   let event = {
//     event_id:req.param("event_id")
//   };
//   try{
//     console.log("event",event);
//     if(!ObjectId.isValid(event.event_id)){
//       return res.send(getSuccessObject(400,"Bad Request"));
//     }

//    // return res.send(getSuccssObject(400,"Bad Request"));
//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     return res.send(getSuccessObject(200,"Event Found",{PSAP_center_id:currentEvent.PSAP_center_id,is_accident_at_home:currentEvent.is_accident_at_home}));
//   }
//   catch(err){
//     console.log("err",err);
//     let errorCode = err.response_code ?err.response_code :501;
//     let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//     return res.send(getErrorObjectWithLocalization(errorCode,errorMessage,"G-001"));//  return getErrorObject(errorCode,errorMessage);
//   }
// }

// function updateOnGoingMissionFlagInLaravel(isMissionOngoing,eventId,userId,authorization){
//   let url =CONSTANTS.laravelBaseUrl +CONSTANTS.updateOnGoingMissionFlag;
//   console.log('Making call:',url);
//   console.log('Making call:  eventId',eventId);
//   return new Promise((resolve, reject) => {
//     let body = {
//       "user_id":userId,
//       "on_going_event": isMissionOngoing,
//       "event_id": eventId
//     }
//     var headers= {
//       'Authorization': authorization//'Bearer eyJraWQiOiJHaVFQdElSdU9RRUE4WStFQUFmblhQVlM2a1V4WmtVSjdmd0ljWU8rWmlnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NTg4OWIzMC1mMDQ1LTQ2N2ItOWExYy03NWQwZWY2ZjAyYzQiLCJhdWQiOiI3ZWVsdGNkaXR1cjc0NTRyMW1zYmkwMWE1NiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBhM2MxNjAyLTgyMTMtMTFlOS05YTc5LThiOTdlZjUwODE2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU5MTM1MzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9xMHF0NHAwZzMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzU4ODliMzAtZjA0NS00NjdiLTlhMWMtNzVkMGVmNmYwMmM0IiwiZXhwIjoxNTU5MTM4OTkwLCJpYXQiOjE1NTkxMzUzOTAsImVtYWlsIjoidmlwaW4xN0B5b3BtYWlsLmNvbSJ9.NdRKj7InE-pCnUdU5miyv6XbzlMnQAYW2OPUErUrt4Hl4K_6Rz_hOnvn8I6ABf-Ep2omT_2aEd60ZFnuJOMLyp_javFUAtyQPuOBrLrG6TvneuzO9GLHNOI08Ugna-w1D0JBmqseQJl-NF12hMJSs1_vgOp1SNpZx6MMDOJToxeSJEnrJ2SuUZDdR6vp4ef4c348atFqIJMfmgDf523jord0dbg_MezxZPa25XEueyRJM3koi-jFJ5mFFrj3rLOSm-nhPuCmr02Od0NjcbiWv0hJ9CHPdY-vrJPU44BEGqLQ3ans6LoWOfTZVJuMpb2JzoDmn8IshYVnto2w54WoBg'
//      }

//     request.post({url:url,headers:headers, json: body}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('upload failed:'+err);
//      reject(err);
//   }
//   console.log('Upload successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// };



// //Logs
// //14-08-2019 
// //  This function changes 
// // We reuse AWSCognito object in frequent calls
// function closeFreeIncidentEventInLaravel(userId,eventId){
//   let url =CONSTANTS.laravelBaseUrl +CONSTANTS.closeUserIncidentEventInLaravelService;
//   console.log('Making call:',url);
//   console.log('Making call:  eventId',eventId);
//   return new Promise((resolve, reject) => {
//     let body = {
//       "user_id":userId,
//       "event_id": eventId
//     }
//     var headers= {
//       //'Authorization': authorization//'Bearer eyJraWQiOiJHaVFQdElSdU9RRUE4WStFQUFmblhQVlM2a1V4WmtVSjdmd0ljWU8rWmlnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NTg4OWIzMC1mMDQ1LTQ2N2ItOWExYy03NWQwZWY2ZjAyYzQiLCJhdWQiOiI3ZWVsdGNkaXR1cjc0NTRyMW1zYmkwMWE1NiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjBhM2MxNjAyLTgyMTMtMTFlOS05YTc5LThiOTdlZjUwODE2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU5MTM1MzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9xMHF0NHAwZzMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzU4ODliMzAtZjA0NS00NjdiLTlhMWMtNzVkMGVmNmYwMmM0IiwiZXhwIjoxNTU5MTM4OTkwLCJpYXQiOjE1NTkxMzUzOTAsImVtYWlsIjoidmlwaW4xN0B5b3BtYWlsLmNvbSJ9.NdRKj7InE-pCnUdU5miyv6XbzlMnQAYW2OPUErUrt4Hl4K_6Rz_hOnvn8I6ABf-Ep2omT_2aEd60ZFnuJOMLyp_javFUAtyQPuOBrLrG6TvneuzO9GLHNOI08Ugna-w1D0JBmqseQJl-NF12hMJSs1_vgOp1SNpZx6MMDOJToxeSJEnrJ2SuUZDdR6vp4ef4c348atFqIJMfmgDf523jord0dbg_MezxZPa25XEueyRJM3koi-jFJ5mFFrj3rLOSm-nhPuCmr02Od0NjcbiWv0hJ9CHPdY-vrJPU44BEGqLQ3ans6LoWOfTZVJuMpb2JzoDmn8IshYVnto2w54WoBg'
//       "x-api-key":CONSTANTS.laravelKey
//      }

//     request.post({url:url,headers:headers, json: body}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//      console.error('upload failed:'+err);
//      reject(err);
//   }
//   console.log('Upload successful!  Server responded with:',body);
//   resolve(body);
// });
//   });
// };


// //We update the “event_status” to 172 and insert all the information related to the persons involved in event sent by the PSAP agent
// // And sends the real time message to all the Active FAUs.
// userController.closeFreeUserEvent = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("closeEventByPSAP params :",event);
//     let authorization = req.headers['authorization'];
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1]
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     // if(currentEvent.assigned_PSAP_agent_id == undefined || currentEvent.assigned_PSAP_agent_id == null){
//     //   return res.send(getSuccessObjectWithLocalization(400,"Event is in unassigned state","ES-026"));
//     // }else
//     // if(parsedUserDate.sub!=currentEvent.assigned_PSAP_agent_id){
//     //   return res.send(getSuccessObjectWithLocalization(400,"You are not the PSAP Agent for this Event","ES-027"));
//     // }
//     // Comenting this for Going to QA without FAU Module


// // Comenting this for Going to QA without FAU Module
//    let users =[];

//    currentEvent.FAUS.map((fau)=>{
//      if(fau.selectedByFAUModule && fau.isMissionAborted ==false && fau.isMissionClosedByFAU ==false){
//     let payloadToSendToPSAP = {
//       "id":event.boris_id,
//       "channel_id":fau.user_id,
//       "notification_type":"REALTIME",
//       "is_persist":"false",
//       "payload":{
//         "type": 'Mission_Ended_By_User',
//         "currentEventId":event.event_id,
//         "category":"Day By Day",
//         "message":"Event Ended by User",
//         "detail":"",
//         "categoryId":132  
//       }
//     }
//     users.push(payloadToSendToPSAP);
//      }
//    });



//    let result1 = await sendNotificationToUsers(users);

// //   console.log("closeEventInFauInFauModule >>>>>>>       ",fauModuleResult);
//     let result = await eventModel.closeFreeEventInMongoDB(event.event_id);
//     let closeFreeIncidentEventInLaravelResult = await closeFreeIncidentEventInLaravel(currentEvent.user_id,event.event_id);
//     console.log("closeFreeIncidentEventInLaravelResult "+closeFreeIncidentEventInLaravelResult);

//     let fauModuleResult = await closeEventInFauInFauModule(event);
//     console.log("closeEventByPSAP s:",fauModuleResult);
//     return res.send(getSuccessObjectWithLocalization(200,"Event has been closed","ES-028"));
//   }
//   catch(err){
//     console.log("err",err);
//    let errorCode = err.response_code ?err.response_code :501;
//           let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//           return res.send(getErrorObjectWithLocalization(errorCode,errorMessage,"G-001",err));
//  ///         return getErrorObject(errorCode,errorMessage);
//   }
// };




// //We update the “event_status” to 172 and insert all the information related to the persons involved in event sent by the PSAP agent
// // And sends the real time message to all the Active FAUs.
// userController.cancelFAURecruitement = async (req, res) => {
//   let event = req.body;
//   try{
//     console.log("closeEventByPSAP params :",event);
//     let authorization = req.headers['authorization'];
//     var tokenArray  = authorization.split(' ');
//     console.log(tokenArray);
//     let token= tokenArray[1]
//     let parsedUserDate = decodeAccessToken(token); //JSON.parse(decodedData);

//     let currentEvent = await eventModel.getEventBasedOnId(event.event_id);
//     let isFauRecrueted = false;
//    currentEvent.FAUS.map((fau)=>{
//      if(fau.selectedByFAUModule){
//       isFauRecrueted = true;
//      }
//    });

//    if(isFauRecrueted)
//    return res.send(getSuccessObjectWithLocalization(200,"Recruement can not be stopped","ES-060"));

//     await eventModel.cancelFAURecruitement(event.event_id);
//     let fauModuleResult = await closeEventInFauInFauModule(event);
//     console.log("closeEventByPSAP s:",fauModuleResult);
//     return res.send(getSuccessObjectWithLocalization(200,"Recruement has been stopped","ES-059"));
//   }
//   catch(err){
//     console.log("err",err);
//    let errorCode = err.response_code ?err.response_code :501;
//           let errorMessage = err.response_message ?err.response_message :"Something Went Wrong";
//           return res.send(getErrorObjectWithLocalization(errorCode,errorMessage,"G-001",err));
//  ///         return getErrorObject(errorCode,errorMessage);
//   }
// };


// function getCloseEventsInBatchLambdaFunction(){
//   let value = "Boris-Lambda-Service-dev-closeActiveEventsInBatch";
//   if(CONSTANTS.stage == "QA"){
//     value = "Boris-Lambda-Service-qa-closeActiveEventsInBatch";
//   }else if(CONSTANTS.stage == "prod"){
//     value = "Boris-Lambda-Service-prod-closeActiveEventsInBatch";
//   }
// return value;
// }

// function InitiateLambdaToCloseEventInBatch(payload){
//   console.log("startFAUModuleAsync payload",payload);
//   let FunctionName =getCloseEventsInBatchLambdaFunction();// CONSTANTS.stage == "QA" ?"Boris-Lambda-Service-qa-updateNotificationOfDisappearance":'Boris-Lambda-Service-dev-updateNotificationOfDisappearance';

//     return new Promise((resolve, reject) => {
//     // resolve(payload);
//     var lambda = new AWS.Lambda({'region': CONSTANTS.region});
//     var params = {
//       FunctionName: FunctionName,//'boris-notification-service-dev-updateNotificationOfDisappearance', // the lambda function we are going to invoke
//       InvocationType: 'Event',
//       LogType: 'Tail',
//       Payload: JSON.stringify(payload)
//     };
//     lambda.invoke(params, function(err, data) {
//       if (err) {
//         console.log('getStartFAULambdaFunction err '+ err);
//         reject(err);
//       } else {
//         console.log('Lambda_B said  Boris-Lambda-Service-dev-updateNotificationOfDisappearance'+ data);
//         resolve(data);
//       }
//     })
//   });
// }
// userController.closeFreeEventsWithBatch = async (req, res) => {
//   await InitiateLambdaToCloseEventInBatch({});
//   return res.send(getSuccessObject(200,"Lambda to Close Events has been invoked"));
// }

module.exports = userController;
