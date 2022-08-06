const region = 'dev';//'Prod':'dev''QA'

module.exports.CONSTANTS  = {
    SECRET_KEY:"somerandomkey",
    AWS_DEPLOY_REGION:getAWSDeployRegion(),//( region == 'dev')? "ap-south-1":"eu-central-1",
    region:getAWSDeployRegion(),//( region == 'dev')? "ap-south-1":"eu-central-1",
    uri:mongoURI(),//( region == 'dev')? "mongodb+srv://boris_dev:Boris_dev@123@cluster0-gpbwx.mongodb.net/test?retryWrites=true":"mongodb+srv://boris_qa:Boris@123@boriscluster0-df5nr.mongodb.net/test?retryWrites=true&w=majority",
    stage:getStage(),//( region == 'dev')? "dev":"QA",
    laravelBaseUrl:getLaravelBaseUrl(),//( region == 'dev')? "http://borisphplaraveldev-env.eba-vxrc49qy.ap-south-1.elasticbeanstalk.com/index.php/api":"https://qaapi.boris-app.com/phppxysvc1",
    updateOnGoingMissionFlag:"/update_on_going_event_status",
    updateFAUSelectionFlag:"/update_fau_selection_status",
    notificationServiceBaseUrl:getNotificationServiceBaseUrl(),//( region == 'dev')? 'https://devapi.boris-app.com/notificationsvc':'https://qaapi.boris-app.com/notificationsvc/notification',
    sendNotifications:"/sendNotifications",
    fauModuleBaseUrl:getFauModuleBaseUrl(),//( region == 'dev')? "http://ec2-13-234-239-236.ap-south-1.compute.amazonaws.com:9080/faumodule":"https://qaapi.boris-app.com/faupxysvc/faumodule",
    start_select_fau:"/start_select_fau",
    user_answer:"/user_answer",
    select_more_fau:"/select_more_fau",
    cancel_mission:"/cancel_mission",
    close_event:"/close_event",
    phpProxy:getLaravelBaseUrl(),//( region == 'dev')? "https://v36v9psxnb.execute-api.ap-south-1.amazonaws.com/dev":"https://qaapi.boris-app.com/phppxysvc1",
    activeFAUFlagFromServer:"/activeFAUFlagFromServer",
    createDisappearanceNotification:"/createDisappearanceNotification",
    disappearanceBucket:"boris-disappearance-event",
    closeDisappearanceEventInLaravel:"/close_disappear_event_in_laravel",
    pubnubPubKey:getpubnubPubKey(),//( region == 'dev')? 'pub-c-9f893bac-3208-444d-8bc3-64377e1c5f6d':'pub-c-d9841fc7-a66b-4a14-a8cc-b80adee5c334',
    pubnubSubKey:getpubnubSubKey(),//( region == 'dev')? 'sub-c-e9149440-58a7-11ea-bf00-e20787371c02':'sub-c-1857b494-a0ce-11ea-8e2f-c62edd1c297d',
    getNotificationMessage:"/get_notification_message_by_code",
    getNotificationMessageBasedOnUsersLocale:"/get_info_for_ask_user_mission",
    iOSNotificationEnviroment:getiOSNotificationEnviroment(),//( region == 'dev')? 'development':'production',
    setEventIdinNotification:"/setEventIdinNotification",
    notificationTopic:getNotificationTopic(),//"com.pikotechnologies.borisapp",//"com.boris.app"     
    closeUserIncidentEventInLaravelService: "/close_user_incident_event",
    laravelKey:"oSj8GvACV654JK2ZdpszF7WgfDYgbHeDaEbSbpuW"
};

// This method return notificationTopic based on region.
function getNotificationTopic(){
    let notificationTopic = "com.pikotechnologies.borisapp.dev";
    if(region == 'QA'){
        notificationTopic = "com.pikotechnologies.borisapp";
    }else if(region == 'Prod'){
        notificationTopic = "com.pikotechnologies.borisapp";
    }
    return notificationTopic;
}

function getStage(){
    let stage = "dev";
    if(region == 'QA'){
        stage = "QA";
    }else if(region == 'Prod'){
        stage = "prod";
    }
    return stage;
}

function getAWSDeployRegion(){
    let AWS_DEPLOY_REGION = 'ap-south-1'
    if(region == 'QA'){
        AWS_DEPLOY_REGION = 'eu-central-1';
    }else if(region == 'Prod'){
        AWS_DEPLOY_REGION = 'eu-central-1';
    }
    return AWS_DEPLOY_REGION;
}

function mongoURI(){
    let uri = 'mongodb+srv://boris_dev:Boris_dev@123@cluster0-gpbwx.mongodb.net/test?retryWrites=true'
    if(region == 'QA'){
        uri = 'mongodb+srv://boris_qa:Boris@123@boriscluster0-df5nr.mongodb.net/test?retryWrites=true&w=majority';
    }else if(region == 'Prod'){
        uri = 'mongodb+srv://borisadmin:Boris@123@cluster0.yjunv.mongodb.net/test?retryWrites=true&w=majority';
    }
    return uri;
}

function getLaravelBaseUrl(){
    let url = 'http://borisphplaraveldev-env.eba-vxrc49qy.ap-south-1.elasticbeanstalk.com/index.php/api'
    if(region == 'QA'){
        url = 'https://qaapi.boris-app.com/phppxysvc1';
    }else if(region == 'Prod'){
        url = 'https://api.boris-app.com/phppxysvc';
    }
    return url;
}

function getNotificationServiceBaseUrl(){
    let url = 'https://devapi.boris-app.com/notificationsvc'
    if(region == 'QA'){
        url = 'https://qaapi.boris-app.com/notificationsvc';
    }else if(region == 'Prod'){
        url = 'https://api.boris-app.com/notificationsvc';
    }
    return url;
}

function getFauModuleBaseUrl(){
    let url = 'http://ec2-13-234-239-236.ap-south-1.compute.amazonaws.com:9080/faumodule'
    if(region == 'QA'){
        url = 'https://qaapi.boris-app.com/faupxysvc/faumodule';
    }else if(region == 'Prod'){
        url = 'https://api.boris-app.com/faupxysvc/faumodule';
    }
    return url;
}


function getpubnubPubKey(){
    let key = 'pub-c-9f893bac-3208-444d-8bc3-64377e1c5f6d'
    if(region == 'QA'){
        key = 'pub-c-d9841fc7-a66b-4a14-a8cc-b80adee5c334';
    }else if(region == 'Prod'){
        key = 'pub-c-222f71fb-9346-482a-898b-a9f0c876af7f';
    }
    return key;
}

function getpubnubSubKey(){
    let key = 'sub-c-e9149440-58a7-11ea-bf00-e20787371c02'
    if(region == 'QA'){
        key = 'sub-c-1857b494-a0ce-11ea-8e2f-c62edd1c297d';
    }else if(region == 'Prod'){
        key = 'sub-c-34a6086e-fd8d-11ea-ae2d-56dc81df9fb5';
    }
    return key;
}

function getiOSNotificationEnviroment(){
    let env = 'development'
    if(region == 'QA'){
        env = 'production';
    }else if(region == 'Prod'){
        env = 'production';
    }
    return env;
}



//changes in Disappearance for free users
//1. update Step function to recieving isHandledByCallCenter