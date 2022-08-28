var pool = require("../config/db");
var getConnection = require('../config/db').getConnection;

var ObjectId = require('mongodb').ObjectID;
var getBooleanValue = require("../config/util").getBooleanValue;

let userModel = {};

let mysqlGetData = async (query)=>{


}
userModel.login = async (body) =>{

    try {
        console.log("getting user data",body.mobileno,body.password)
        let mysql = await getConnection();
        console.log("got connection")
        let query =`select * from mahavirsports.users where mobileno = '${body.mobileno}' and password = '${body.password}'`;
        console.log("query ", query);
        let results = await mysql.query(query);
        await mysql.end();
        console.log("results ", results);
        if(results && results.length!=undefined && results.length == 0 ){
            console.log("No record found")
            throw {"errorCode":400,"reason":"No user found"};
        }
        return results[0];
    } catch (err) {
        throw err;
    }
}

userModel.signup = async (body) =>{

    try {
        console.log("getting user data",body.mobileno,body.password)
        let mysql = await getConnection();
        console.log("got connection")
        let query =`insert into mahavirsports.users(name,mobileno,password,role,status) values('${body.name}','${body.mobileno}','${body.password}','USER','VERIFY');`;
        console.log("query ", query);
        let results = await mysql.query(query);
        await mysql.end();
        console.log("results ", results);
        if(results && results.affectedRows == undefined ){
            console.log("No record found")
            let reason ="Something went wrong";
            throw {"errorCode":400,"reason":reason};
        }
        return results;
    } catch (err) {
        let reason ="Something went wrong";
        if(err.code == "ER_DUP_ENTRY")
        reason = "User already exisit with given Mobile number";
        throw {"errorCode":400,"reason":reason};
       // throw err;
    }
}



userModel.verify = async (body) =>{

    try {
        let mysql = await getConnection();
        console.log("got connection")
        let query =`update mahavirsports.users set status = 'ACTIVE' where mobileno = '${body.mobileno}'`;
        console.log("query ", query);
        let results = await mysql.query(query);
        await mysql.end();
        console.log("results ", results);
        if(results && results.affectedRows == undefined ){
            console.log("No record found")
            let reason ="Something went wrong";
            throw {"errorCode":400,"reason":reason};
        }
        return results;
    } catch (err) {
        let reason ="Something went wrong";
        if(err.code == "ER_DUP_ENTRY")
        reason = "User already exisit with given Mobile number";
        throw {"errorCode":400,"reason":reason};
       // throw err;
    }
}

userModel.updatePassword = async (body) =>{

    try {
        let mysql = await getConnection();
        console.log("got connection")
        let query =`update mahavirsports.users set password = '${body.newpassword}' where userid = '${body.userData.userid}'`;
        console.log("query ", query);
        let results = await mysql.query(query);
        await mysql.end();
        console.log("results ", results);
        if(results && results.affectedRows == undefined ){
            console.log("No record found")
            let reason ="Something went wrong";
            throw {"errorCode":400,"reason":reason};
        }
        return results;
    } catch (err) {
        let reason ="Something went wrong";
        if(err.code == "ER_DUP_ENTRY")
        reason = "User already exisit with given Mobile number";
        throw {"errorCode":400,"reason":reason};
       // throw err;
    }
}
userModel.getPurchases = async (body) =>{

    try {
        let mysql = await getConnection();
        let query =`select * from mahavirsports.purchases where userid = '${body.userData.userid}' order by purchasedate desc`;
        console.log("query ", query);
        let results = await mysql.query(query);
        await mysql.end();
        console.log("results ", results);
        return results;
    } catch (err) {
        throw err;
    }
}

userModel.getTickets = async (body) =>{

    try {
        let mysql = await getConnection();
        let query =`select t.*,u.name as assignee,u.mobileno assigneecontact from mahavirsports.tickets t left outer join mahavirsports.users u on t.assignee = u.userid where t.userid ='${body.userData.userid}' `;
  
        query += `order by t.created desc`
        console.log("query ", query);
        let results = await mysql.query(query);
        await mysql.end();
        console.log("results ", results);
        return results;
    } catch (err) {
        throw err;
    }
}


userModel.createTicket = async (body) =>{

    try {
        let mysql = await getConnection();
        let query =`insert into mahavirsports.tickets(userid,purchaseid,status,comment) values(${body.userData.userid},${body.purchaseid},'PENDING','[${body.comment}');`;
        console.log("query ", query);
        let results = await mysql.query(query);
        await mysql.end();
        console.log("results ", results);
        if(results && results.affectedRows == undefined ){
            console.log("No record found")
            let reason ="Something went wrong";
            throw {"errorCode":400,"reason":reason};
        }
        return results;
    } catch (err) {
        let reason ="Something went wrong";
        if(err.code == "ER_DUP_ENTRY")
        reason = "User already exisit with given Mobile number";
        throw {"errorCode":400,"reason":reason};
       // throw err;
    }
}

// eventModel.insertEvent = async (event) => {
  
//   const client =await getConnection();
//   let collectionName = "Events";
//   if(event.event_type == 160 || event.event_type == 161){
//     collectionName ="UnperceivedEvents"
//   }
//   const collection = client.db("Boris").collection(collectionName);
//   return new Promise((resolve, reject) => {
//     collection.insertOne( event ).then(result => {
//       console.log(result.insertedId);
//       // console.log("clossing connection befotre",client);
//       // client.close();
//       // console.log("clossing connection after",client);
//       if(result.insertedId)
//       resolve({ _id: result.insertedId.toString() });
//       else
//       reject({ _id: null })
//     });
//   });
  
// }


// eventModel.getEventsFromDB = async (event,agent_id,pageIndex,pageSize)=>{

//   let eventStatuses = (event.event_status)?event.event_status.split(","):[];
//   let isAssignedToOthers = false;
//   let isUnassigned = false;
// let evenStatusArray = [];
//   let filters = {};
//   eventStatuses.map((eventStatus)=>{
//     if(eventStatus == 171){ // UnAssigned
//       isUnassigned = true;
//       // filters.event_status = 171;
//      //  evenStatusArray.push(171);
//      } if(eventStatus == 169){ // ACtive we will check userId
//        //filters.event_status = 169;
//        filters.assigned_PSAP_agent_id = agent_id;
//        evenStatusArray.push(169);
//      } if(eventStatus == 172) { // closed
//        //filters.event_status = 172;
//        evenStatusArray.push(172);
//        filters.assigned_PSAP_agent_id = agent_id;
//      } 
     
//      if(eventStatus == 170) { // Assigned To others
//        //filters.event_status = 169;
//        isAssignedToOthers = true;
//       //  evenStatusArray.push(169);
//       //  filters.assigned_PSAP_agent_id = {$ne :agent_id};
//      }
//   })


  

//   if(evenStatusArray.length!= 0)
//   filters.event_status ={$in:evenStatusArray}

//   let newFiltes = {};
//   if(event.PSAP_center_id){

//   filters.PSAP_center_id = event.PSAP_center_id
//   if(isAssignedToOthers) { // Assigned To others
//     let filtersReplica = Object.assign({},filters);
//     newFiltes = {$or:[
//       {assigned_PSAP_agent_id : {$ne :agent_id},event_status:169,PSAP_center_id: event.PSAP_center_id}
//     ]}
//     if(filtersReplica.event_status){
//       newFiltes.$or.push(filtersReplica)
//     }
//   }else{
//     newFiltes = filters;
//   }
// }
// else{
//   //filters.assigned_PSAP_agent_id = {$ne :agent_id};
//   if(isAssignedToOthers) { // Assigned To others

//     let filtersReplica = Object.assign({},filters);
//     newFiltes = {$or:[{assigned_PSAP_agent_id : {$ne :agent_id},event_status:169}
//     ]}
//     if(filtersReplica.event_status){
//       newFiltes.$or.push(filtersReplica)
//     }
//   }else{
//     newFiltes = filters;
//   }
// }
// console.log("newFiltes before check",newFiltes);
// if(isUnassigned){
//   if(newFiltes.$or){
//     newFiltes.$or.push({event_status:171,PSAP_center_id:event.PSAP_center_id})
//   }else if(newFiltes.event_status){
//     newFiltes = {$or:[newFiltes,{event_status:171,PSAP_center_id:event.PSAP_center_id}]}
//   //  newFiltes.event_status.push(171);
//   }
//   else{
//     newFiltes.event_status = 171;
//     newFiltes.PSAP_center_id = event.PSAP_center_id
//   }
// }


// console.log("filters ",filters,pageIndex,pageSize);
// console.log("newFiltes >>> stringify",JSON.stringify(newFiltes));

//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");
//   const count = await collection.find(newFiltes).sort({_id:-1}).count();
//   console.log("filters ",filters,pageIndex,pageSize,"count   ",count);
//   if(pageSize == undefined || pageIndex == undefined){
//     pageSize = count;
//     pageIndex = 1;
//   }
//   const data =  await collection.find(newFiltes).sort({_id:-1}).skip(pageSize*(pageIndex-1)).limit(pageSize).toArray();;
//   // console.log("clossing connection befotre",client);
//   // client.close();
//   // console.log("clossing connection after",client);
//   return { data, count };
  
// };

// eventModel.getEventBasedOnId = async (eventId)=>{
//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");
//   const data =  await collection.findOne({"_id" : ObjectId(eventId)});
//   // console.log("clossing connection befotre",client);
//   // client.close();
//   // console.log("clossing connection after",client);
//   return new Promise((resolve, reject) => {

//     if(data == undefined || data == null)
//     reject({ "response_code":404,
//       "response_message":"No Event Found with the provied Event_id"});
//     resolve(data);
//   })
//   //return data;
// }


// eventModel.assignEventToPSAP = async (eventId,PSAPAgentId,code,PSAPAgentName)=>{

//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");
//   const data =  await collection.findOne({"_id" : ObjectId(eventId)});
  
//   console.log("data  ",data);
//   return new Promise((resolve, reject) => {
//     if(data == undefined || data == null)
//     reject({ "response_code":400,
//       "response_message":"No Event Found with the provied Event_id"});
//       if(data.assigned_PSAP_agent_id !="")
//       reject({ "response_code":400, 
//       "response_message":"Event is already assigned to other user"});
//       if(data.code !=code)
//       reject({ "response_code":404, 
//       "response_message":"Invalid Code Provided",
//       "respose_message_code":"ES-055"});
//     // if(data.code !=code)
//     //   reject({ "response_code":404, 
//     //   "response_message":"Invalid Code Provided"});

//    // await collection.update({id:userId,notification_id:notificationId},{$set:{'read':true}});
//     collection.updateOne({"_id" : ObjectId(eventId),"code":code},{$set:{'assigned_PSAP_agent_id':PSAPAgentId,"assigned_PSAP_agent_name":PSAPAgentName,"event_status":169}}).then(result => {
//       console.log(result);
//   //     console.log("clossing connection befotre",client);
//   // client.close();
//   // console.log("clossing connection after",client);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// };

// eventModel.insertFAUForEvent =  async (eventId,FAU)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//      collection.update({"_id" : ObjectId(eventId)},{ $push: { FAUS: FAU }}).then(result => {
//       // console.log("clossing connection befotre",client);
//       // client.close();
//       // console.log("clossing connection after",client);
//       // console.log(result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }

// eventModel.updateFAUFlagOnFAUModuleSelection =  async (eventId,user_id)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//      collection.updateOne(
//       { _id: ObjectId(eventId), "FAUS.user_id": user_id },
//       { $set: { "FAUS.$.selectedByFAUModule" : true , "FAUS.$.time_of_allotment" :Date.now() } }
//    ).then(result => {
//     // console.log("clossing connection befotre",client);
//     // client.close();
//     // console.log("clossing connection after",client);
//     //   console.log(result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// };

// eventModel.updateProblemWithConstraintInMongoDB =  async (eventId,details)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//     collection.update({"_id" : ObjectId(eventId)},{ $push: { problems_with_constraints: details }}).then(result => {
//       // console.log(result);
//       // console.log("clossing connection befotre",client);
//       // client.close();
//       // console.log("clossing connection after",client);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// };

// // Update get_fau_for_accident based on EventId in Event collection
// eventModel.updateStartSelectFauFlagInMongoDB =  async (eventId)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//     collection.update({"_id" : ObjectId(eventId)},{ $set: { get_fau_for_accident: true}}).then(result => {
//       // console.log("clossing connection befotre",client);
//       // client.close();
//       // console.log("clossing connection after",client);
//       // console.log(result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// };

// eventModel.updateFirstFauForEventInMongoDB =  async (eventId,firstFau)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//      collection.update({"_id" : ObjectId(eventId)},{ $set: { firstFau: firstFau }}).then(result => {
//       // console.log("clossing connection befotre",client);
//       // client.close();
//       // console.log("clossing connection after",client);
//       // console.log(result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }
// eventModel.updateFAUTimeOfArrival =  async (eventId,user_id)=>{
//   const client =await getConnection();
//   // let eventId = "5d4d3b954b7561a5b1792283";
//    const collection = client.db("Boris").collection("Events");
//    return new Promise((resolve, reject) => {
//       collection.updateOne(
//        { _id: ObjectId(eventId), "FAUS.user_id": user_id },
//        { $set: { "FAUS.$.selectedByFAUModule" : true , "FAUS.$.time_of_arrival" :Date.now() } }
//     ).then(result => {
//     //  console.log("clossing connection befotre",client);
//     //  client.close();
//     //  console.log("clossing connection after",client);
//        console.log(result);
//        if(result)
//        resolve({ result: result});
//        else
//        reject({ _id: null })
//      });
//    });
// }
// eventModel.updateWhoIsInvolvedInMongoDB =  async (eventId,whoIsInvolved,event,is_who_is_involved_submitted_by_PSAP)=>{

//   //default Value - As if  FAU is submiting Who is involved this we set is_first_fau_reached to true
//   let valueToUpdate ={ who_is_involved: whoIsInvolved,is_unknown_involved_in_accident:event.is_unknown_involved_in_accident,unknown_count:event.unknown_count,is_first_fau_reached:true,is_who_is_involved_submitted_by_PSAP:is_who_is_involved_submitted_by_PSAP };

//     //if PSAP is submutting we do not change/set is_first_fau_reached 
//   if(is_who_is_involved_submitted_by_PSAP == true){
//     valueToUpdate = { who_is_involved: whoIsInvolved,is_unknown_involved_in_accident:event.is_unknown_involved_in_accident,unknown_count:event.unknown_count,is_who_is_involved_submitted_by_PSAP:is_who_is_involved_submitted_by_PSAP };
//   }
//   const client =await getConnection();
//   // let eventId = "5d4d3b954b7561a5b1792283";
//    const collection = client.db("Boris").collection("Events");
//    return new Promise((resolve, reject) => {
//       collection.update({"_id" : ObjectId(eventId)},{ $set: valueToUpdate}).then(result => {
//        console.log(result);
//       //  console.log("clossing connection befotre",client);
//       //  client.close();
//       //  console.log("clossing connection after",client);
//        if(result)
//        resolve({ result: result});
//        else
//        reject({ _id: null })
//      });
//    });
// }

// eventModel.closeMissonByFAUInEventDB =  async (eventId,user_id,isAbortd)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//  console.log("eventId",eventId);
//  console.log("user_id",user_id);
//  console.log("isAbortd",isAbortd);
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//      collection.updateOne(
//       { _id: ObjectId(eventId), "FAUS.user_id": user_id },
//       { $set: { "FAUS.$.isMissionAborted" : isAbortd,"FAUS.$.isMissionClosedByFAU":true  } }
//    ).then(result => {
//     // console.log("clossing connection befotre",client);
//     // client.close();
//     // console.log("clossing connection after",client);
//     //   console.log(result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }

// eventModel.updateNotesInMongoDB =  async (eventId,note)=>{
//   const client =await getConnection();
//   // let eventId = "5d4d3b954b7561a5b1792283";
//    const collection = client.db("Boris").collection("Events");
//    return new Promise((resolve, reject) => {
//      collection.update({"_id" : ObjectId(eventId)},{ $push: { notes: note }}).then(result => {
//       //  console.log(result);
//       //  console.log("clossing connection befotre",client);
//       //  client.close();
//       //  console.log("clossing connection after",client);
//        if(result)
//        resolve({ result: result});
//        else
//        reject({ _id: null })
//      });
//    });
// }
// eventModel.closeEventInMongoDB =  async (eventId,whoIsInvolved)=>{
//   const client =await getConnection();
//   // let eventId = "5d4d3b954b7561a5b1792283";
//    const collection = client.db("Boris").collection("Events");
//    return new Promise((resolve, reject) => {
//      collection.update({"_id" : ObjectId(eventId)},{ $set: { who_is_involved: whoIsInvolved,event_status: 172}}).then(result => {
//       //  console.log(result);
//       //  console.log("clossing connection befotre",client);
//       //  client.close();
//       //  console.log("clossing connection after",client);
//        if(result)
//        resolve({ result: result});
//        else
//        reject({ _id: null })
//      });
//    });
// }

// eventModel.closeFreeEventInMongoDB =  async (eventId)=>{
//   const client =await getConnection();
//   // let eventId = "5d4d3b954b7561a5b1792283";
//    const collection = client.db("Boris").collection("Events");
//    return new Promise((resolve, reject) => {
//      collection.update({"_id" : ObjectId(eventId)},{ $set: { event_status: 172}}).then(result => {
//       //  console.log(result);
//       //  console.log("clossing connection befotre",client);
//       //  client.close();
//       //  console.log("clossing connection after",client);
//        if(result)
//        resolve({ result: result});
//        else
//        reject({ _id: null })
//      });
//    });
// }

// eventModel.arrivalOfEmergencyUnitInMongoDB =  async (event)=>{
//   const client =await getConnection();
//   // let eventId = "5d4d3b954b7561a5b1792283";
//    const collection = client.db("Boris").collection("Events");
//    return new Promise((resolve, reject) => {
//      collection.update({"_id" : ObjectId(event.event_id)},{ $set: { emergency_unit_arival_time:event.emergency_unit_arival_time, emergency_unit_id:event.emergency_unit_id,is_emergency_reached_to_the_site:true}}).then(result => {
//       //  console.log(result);
//       //  console.log("clossing connection befotre",client);
//       //  client.close();
//       //  console.log("clossing connection after",client);
//        if(result)
//        resolve({ result: result});
//        else
//        reject({ _id: null })
//      });
//    });
// }
// eventModel.getEventsForAdminFromDB =  async (pageIndex,pageSize,search="",event_type,isHandledByCallCenter)=>{
//   let filters =  {
//     event_status:172,
//     isHandledByCallCenter:isHandledByCallCenter,
//     //event_type:event_type,
//     $or:[{"assigned_PSAP_agent_name" : {$regex : ".*"+search+".*",$options : 'i'}},{"name" : {$regex : ".*"+search+".*",$options : 'i'}}],
//   };
//   //let searchObjectId = ObjectId(search);
//   if(ObjectId.isValid(search)){
//     filters['$or'].push({"_id" : ObjectId(search)});
//   }
//   console.log("filters  ",filters);
//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");
//   const count = await collection.find(filters).sort({_id:-1}).count();
//   console.log("filters ",filters,pageIndex,pageSize,"count   ",count);
//   if(pageSize == undefined || pageIndex == undefined){
//     pageSize = count;
//     pageIndex = 1;
//   }
//   const data =  await collection.find(filters).sort({_id:-1}).skip(pageSize*(pageIndex-1)).limit(pageSize).toArray();;
//   // console.log("clossing connection befotre",client);
//   // client.close();
//   // console.log("clossing connection after",client);
//   return { data, count };

// }

// eventModel.updateDisappearanceDoccument =  async (event)=>{
//   const client =await getConnection();
// let newObject = {};
// let changeLog = {

// }
// console.log("updatinggg location")
//   Object.keys(event).forEach(key=>{
//    if(key == "name" || key == "age" || key == "corpulence" || key == "eye_color" || key == "hair_color" 
//    || key == "h_unit" || key == "height" || key == "language" || key == "shirt_color" || key == "trouser_color" || key == "label"
//    || key == "medical_concern" || key == "is_accompanied" || key == "other_info" || key == "height" || key == "h_unit" || key == "height"){
//     newObject = {...newObject,[key]:event[key]};
//    }
    
//   });
// if(event.latitude && event.longitude){
//   newObject.location = {
//     "latitude": event.latitude,
//     "longitude": event.longitude
// }
// }
// if(event.is_unknown_location){
//   newObject.is_unknown_location = getBooleanValue(event.is_unknown_location)
// };
// if(event.image_url!=undefined)
// newObject.image_url=event.image_url;

// if(event.other_image_url!=undefined)
// newObject.other_image_url=event.other_image_url;



// if(event.extra_image_url!=undefined)
// newObject.extra_image_url=event.extra_image_url;
// newObject.modified_date = Date.now().toString();
// console.log("newObject >>>",newObject);
// console.log(">>>>>>>>>>>>>>>>  mmm  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//   const collection = client.db("Boris").collection("Events");


// return new Promise((resolve, reject) => {
//   collection.findOneAndUpdate({"_id" : ObjectId(event.event_id)}, {$push: { change_logs: newObject },$set:newObject},{ returnOriginal: false }).then(result => {
//    console.log("result",result);
//    if(result)
//    resolve({ result: result});

//    else
//    console.log("error");
//    reject({ _id: null })
//  });
// });

// }


// eventModel.insertUserForConversationDisappearanceEvent =  async (eventId,user)=>{
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

// eventModel.insertUserForDisappearanceEvent =  async (eventId,user)=>{
//   const client =await getConnection();
//   // let eventId = "5d4d3b954b7561a5b1792283";
//    const collection = client.db("Boris").collection("Events");
//    return new Promise((resolve, reject) => {
//       collection.update({"_id" : ObjectId(eventId)},{ $push: { users_in_visinity: user }}).then(result => {
//        console.log("result".result);
//        if(result)
//        resolve({ result: result});
//        else
//        reject({ _id: null })
//      });
//    });
// }

// eventModel.removeUserForDisappearanceEvent =  async (eventId,user)=>{
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



// //Logs
// //13-12-2019 
// //Sprint 31
// //  This Function mark is_cancel flag to true for user in Event JSON
// eventModel.userCancelledDisappearanceEvent =  async (eventId,user)=>{
//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//     collection.updateOne(
//      { _id: ObjectId(eventId), "users_in_visinity.user_id": user.user_id },
//      { $set: { "users_in_visinity.$.is_canceled" : true } }
//   ).then(result => {
//   //  console.log("clossing connection befotre",client);
//   //  client.close();
//   //  console.log("clossing connection after",client);
//      console.log(result);
//      if(result)
//      resolve({ result: result});
//      else
//      reject({ _id: null })
//    });
//  });
// }

// eventModel.acknolegdeUserForDisappearance =  async (eventId,user_id)=>{
//   const client =await getConnection();
//   // let eventId = "5d4d3b954b7561a5b1792283";
//    const collection = client.db("Boris").collection("Events");
//    return new Promise((resolve, reject) => {
//       collection.updateOne(
//        { _id: ObjectId(eventId), "users_in_visinity.user_id": user_id },
//        { $set: { "users_in_visinity.$.isAcknoledged" : true } }
//     ).then(result => {
//     //  console.log("clossing connection befotre",client);
//     //  client.close();
//     //  console.log("clossing connection after",client);
//        console.log(result);
//        if(result)
//        resolve({ result: result});
//        else
//        reject({ _id: null })
//      });
//    });
// }

// eventModel.closeDisappearedEventInMongoDB =  async (eventId,is_user_going_well,is_user_foundback)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//     collection.update({"_id" : ObjectId(eventId)},{ $set: { event_status: 172,is_user_going_well:is_user_going_well,is_user_foundback:is_user_foundback}}).then(result => {
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }


// //Logs
// //06-01-2020
// //Sprint 33
// //  This function set mission_closed_by_launcher to 'True' based on eventId
// eventModel.closeDisappearedEventRaisedByLauncher =  async (eventId,is_user_going_well,is_user_foundback)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//     collection.update({"_id" : ObjectId(eventId)},{ $set: { mission_closed_by_launcher: true,is_user_going_well:is_user_going_well,is_user_foundback,is_user_foundback}}).then(result => {
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }


// eventModel.setExecutionARNofStepFunctionInEvent =  async (eventId,ExecutionARN)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//      collection.updateOne(
//       { _id: ObjectId(eventId)},
//       { $set: { "ExecutionARN" : ExecutionARN } }
//    ).then(result => {
//       console.log(result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }

// eventModel.changeViciityAreaInDisappearedEventInMongoDB =  async (eventId,vicinityZone)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//     collection.update({"_id" : ObjectId(eventId)},{ $set: { vicinity_zone: vicinityZone}}).then(result => {
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }
// eventModel.pauseOrResumeLocationInMongoDB =  async (eventId,is_realtime_tracking_on)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//     collection.update({"_id" : ObjectId(eventId)},{ $set: { is_realtime_tracking_on: is_realtime_tracking_on}}).then(result => {
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// }

// eventModel.getEventsBasedOnIdsFromMongoDB =  async (eventIds)=>{
//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");
//   const data =  await collection.find({"_id" : { $in: eventIds } }).toArray();
//   return data;
//   // return new Promise((resolve, reject) => {

//   //   if(data == undefined || data == null)
//   //   reject({ "response_code":404,
//   //     "response_message":"No Event Found with the provied Event_id"});
//   //   resolve(data);
//   // })
// }

// eventModel.insertMissedVideoCallForEvent =  async (eventId,callDetails)=>{
//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");



//   return new Promise((resolve, reject) => {
//     collection.update({"_id" : ObjectId(eventId)},{ $push: { missed_calls: callDetails }}).then(result => {
//      console.log("result".result);
//      if(result)
//      resolve({ result: result});
//      else
//      reject({ _id: null })
//    });
//  });
// }

// eventModel.getEventsbasedOnPSAPId =  async (agent_id,eventStatus)=>{
//   let filters = {
//     assigned_PSAP_agent_id:agent_id,
//     event_status:eventStatus//169,
//   };                                                                                                                                

//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");

//   const data =  await collection.find(filters).toArray();;
//    return { data };
// }

// eventModel.updateDisappearanceDoccument2 =  async (event)=>{
// }



// eventModel.activeEventBasedOnUserId =  async (userId,eventType)=>{
//   let filters = {
//     user_id:userId,
//     $or:[{event_status:171},{event_status:169}],//169,
//     event_type:eventType
//   };                                                                                                                                
//   console.log("filters >>",filters);
//   const client =await getConnection();
//   const collection = client.db("Boris").collection("Events");

//   const data =  await collection.find(filters).toArray();;
//    return { data };
// }


// // Update get_fau_for_accident based on EventId in Event collection
// eventModel.cancelFAURecruitement =  async (eventId)=>{
//   const client =await getConnection();
//  // let eventId = "5d4d3b954b7561a5b1792283";
//   const collection = client.db("Boris").collection("Events");
//   return new Promise((resolve, reject) => {
//     collection.update({"_id" : ObjectId(eventId)},{ $set: { isFAURceruitementCancled: true}}).then(result => {
//       // console.log("clossing connection befotre",client);
//       // client.close();
//       // console.log("clossing connection after",client);
//       // console.log(result);
//       if(result)
//       resolve({ result: result});
//       else
//       reject({ _id: null })
//     });
//   });
// };

module.exports = userModel;
// export default help;
