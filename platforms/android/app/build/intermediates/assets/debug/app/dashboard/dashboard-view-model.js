var Observable = require("data/observable").Observable;
const appSettings = require("application-settings");
var viewModel = new Observable();
let frameModule = require("tns-core-modules/ui/frame")
//let firebaseDB = require("../app").firebaseDB
var firebase = require("nativescript-plugin-firebase");
let http = require("tns-core-modules/http");
var firebaseDB
var userId

function createViewModel(){ 
    

    userId: String = null
    accessToken: String = appSettings.getString("access_token")
    username: String = null

    var lastTapTime = appSettings.getNumber("lastTap")
    if(lastTapTime){
        viewModel.message = getMessage(lastTapTime)
    }

    viewModel.onTap = function onTap(){
           var lastTap = new Date().getMilliseconds()
           appSettings.setNumber("lastTap", lastTap)
           viewModel.set("message", getMessage(lastTap));
           saveTap(new Date())
    }

    viewModel.onSettingsTap = function onSettingsTap(){
         //alert("OnTap")
     //frameModule.topmost().navigate("settings/settings")
     frameModule.topmost().navigate(
        {
            moduleName: "settings/settings",
            clearHistory: true,
            animated: true,
            // transition: {
            //     name: "flipLeft",
            //     duration: 380,
            //     curve: "easeIn"
            // }
        }
    )
     
    }

    initFirebase()
    getUserId()
    return viewModel
}

function showStatistic(){

    if(viewModel.userId){
        
    }
}

function getUserId(){
    var FACEBOOK_GRAPH_API_URL= "https://graph.facebook.com/v2.9"

    http.getJSON(FACEBOOK_GRAPH_API_URL + "/me?access_token=" + this.accessToken).then((res) => {
        console.log("facebook init result" + res)
        // appSettings.setString("username", res.name)
        // viewModel.set("userId", res.id);
        // viewModel.set("username", res.name);
  
    //     // Get logged in user's avatar
    //     // ref: https://github.com/NativeScript/NativeScript/issues/2176
    //     console.log(FACEBOOK_GRAPH_API_URL + "/" + this.get("userId") + "/picture?type=large&redirect=false&access_token=" + this.accessToken);
    //     http.getJSON(FACEBOOK_GRAPH_API_URL + "/" + this.get("userId") + "/picture?type=large&redirect=false&access_token=" + this.accessToken).then((res) => {
    //       this.set("avatarUrl", res.data.url);
    //     }, function (err) {
    //       alert("Error getting user info: " + err);
    //     });
    //   }, function (err) {
    //     alert("Error getting user info: " + err);
      });
}

function saveTap(lastTap){
    console.log("saveTap")
    if(!userId)
    console.log("User is undefined")
    {
       return
    }

    if(firebaseDB){
        const tap = {
            date : lastTap
        }

        firebase.push(
            '/eats',
             tap
        );
    }else{
        console.log("Firebase not found")
    }
}

function initFirebase(){
    firebase.init({
        // Optionally pass in properties for database, authentication and cloud messaging,
        // see their respective docs.
      }).then(
          function (instance) {
            console.log("firebase.init done");
            firebaseDB = instance
          },
          function (error) {
            console.log("firebase.init error: " + error);
          }
      );
}


function getMessage(lastTapTime){
    console.log("getMessagess date now" + new Date())
    var date = new Date()
    var timeBetweenMeals =  appSettings.getNumber("timeBetweenMealsInHours")
    if(!timeBetweenMeals){
       timeBetweenMeals = 2
    }
    date.setMilliseconds(lastTapTime  + (timeBetweenMeals * 60 * 60 * 1000))
    var message = "Your next meal will be at " + formatAMPM(date)
    console.log(message)
    return message
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

exports.createViewModel = createViewModel