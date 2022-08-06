var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');

router.post('/login',async (req, res, next)=> {

    try {
    let body = req.body;
    console.log("login:body ",body)
    let user = await userController.login(body)
    res.send({ "success": user });
    }catch(ex){
    res.send(ex);
    }
  });

  router.post('/signup',async (req, res, next)=> {

    try {
    let body = req.body;
    console.log("login:body ",body)
    let user = await userController.signup(body)
    res.send({ "success": user });
    }catch(ex){
    res.send(ex);
    }
  });
// var multer = require('multer');
// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage })

// const { Lambda, Service } = require('aws-sdk');
// /* GET users listing. */

// router.post('/registerEvent', function(req, res, next) {
//   eventController.registerEvent(req,res);
//  // res.send({"tst":"hel"});
// });

// router.get('/getEvents', function(req, res, next) {
//   eventController.getEvents(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/acceptEvent', function(req, res, next) {
//   eventController.acceptEvent(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/send_user', function(req, res, next) {
//   eventController.selectFauForEvent(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/ask_users_for_mission', function(req, res, next) {
//   eventController.askUsersForMission(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/user_answer', function(req, res, next) {
//   eventController.userAnswer(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/problem_with_constraint', function(req, res, next) {
//   eventController.problemWithConstraint(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/startSelectFau', function(req, res, next) {
//   eventController.startSelectFau(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/finalCallFromFAUForSelection', function(req, res, next) {
//   eventController.finalCallFromFAUForSelection(req,res);
//  // res.send({"tst":"hel"});
// });

// router.get('/getEventById', function(req, res, next) {
//   eventController.getEventById(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/FAUResponseAfterReachingAccidentSite', function(req, res, next) {
//   eventController.FAUResponseAfterReachingAccidentSite(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/endMissionForFAU', function(req, res, next) {
//   eventController.endMissionForFAU(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/submitWhoIsInvolvedInEvent', function(req, res, next) {
//   eventController.submitWhoIsInvolvedInEvent(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/submitNotesInEvent', function(req, res, next) {
//   eventController.submitNotesInEvent(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/closeEventByPSAP', function(req, res, next) {
//   eventController.closeEventByPSAP(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/arrivalOfEmergencyUnit', function(req, res, next) {
//   eventController.arrivalOfEmergencyUnit(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/sendMoreFaus', function(req, res, next) {
//   eventController.sendMoreFaus(req,res);
//  // res.send({"tst":"hel"});
// });
// router.get('/getEventsForAdmin', function(req, res, next) {
//   eventController.getEventsForAdmin(req,res);
//  // res.send({"tst":"hel"});
// });
// router.put('/updateDisappearedUserDetails', upload.any(),function(req, res, next) {
//   console.log("hello");
//   eventController.updateDisappearedUserDetails(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/selectUserForDisappearance', function(req, res, next) {
//   eventController.selectUserForDisappearance(req,res);
//  // res.send({"tst":"hel"});
// });



// router.post('/sendMessageToUsersinVicinity', function(req, res, next) {
//   eventController.sendMessageToUsersinVicinity(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/cancelResearchForDisappearance', function(req, res, next) {
//   eventController.cancelResearchForDisappearance(req,res);
//  // res.send({"tst":"hel"});
// });
// router.post('/userAcknowledgedForDisappearance', function(req, res, next) {
//   eventController.userAcknowledgedForDisappearance(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/closeDisappearedEvent', function(req, res, next) {
//   eventController.closeDisappearedEvent(req,res);
//  // res.send({"tst":"hel"});
// });


// router.post('/changeVicinityArea', function(req, res, next) {
//   eventController.changeVicinityArea(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/pauseOrResumeLocationUpdates', function(req, res, next) {
//   eventController.pauseOrResumeLocationUpdates(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/getSecuredURLToUploadAudio', function(req, res, next) {
//   eventController.getSecuredURLToUploadAudio(req,res);
//  // res.send({"tst":"hel"});
// });

// router.get('/getEventsBasedOnIds', function(req, res, next) {
//   eventController.getEventsBasedOnIds(req,res);
//  // res.send({"tst":"hel"});
// });


// router.get('/getDisappearedUserRecordings', function(req, res, next) {
//   eventController.getDisappearedUserRecordings(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/getTwilioAccessTokenForVideoCall', function(req, res, next) {
//   eventController.getTwilioAccessTokenForVideoCall(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/rejectVideoCall', function(req, res, next) {
//   eventController.rejectVideoCall(req,res);
//  // res.send({"tst":"hel"});
// });



// router.get('/getAssignedPSAPCenterByEventId', function(req, res, next) {
//   eventController.getAssignedPSAPCenterByEventId(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/closeFreeUserEvent', function(req, res, next) {
//   eventController.closeFreeUserEvent(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/cancelFAURecruitement', function(req, res, next) {
//   eventController.cancelFAURecruitement(req,res);
//  // res.send({"tst":"hel"});
// });

// router.post('/closeFreeEventsWithBatch', function(req, res, next) {
//   eventController.closeFreeEventsWithBatch(req,res);
//  // res.send({"tst":"hel"});
// });

// // We need to move these Lambda to Lambda Service
// // activeFAUModuleForUser:
// // handler: handler.activeFAUModuleForUser
// // deactiveFAUModuleForUser:
// // handler: handler.deactiveFAUModuleForUser

module.exports = router;
