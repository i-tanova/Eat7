var Observable = require("data/observable").Observable;
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
let http = require("tns-core-modules/http");

const frameModule = require("tns-core-modules/ui/frame");
const topmostFrame = frameModule.topmost();

var firebaseDB


function createViewModel(page){ 
    var viewModel = new Observable();
    viewModel.userId = getSavedUserId()
    
    console.log("UserId: " + viewModel.userId)
    if(!viewModel.userId){
        var accessToken = appSettings.getString("access_token")
        console.log("Access token: " + accessToken)
        getUserId(accessToken)
    }else{
        viewModel.username = appSettings.getString("username")
    }

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
          topmostFrame.navigate("settings/settings")
    }

    viewModel.showStatistic = function showStatistic(){
        if(viewModel.userId && firebaseDB){
            getSavedTaps().then(
                res => {
                    const entries = []
                  for (let prop in res) {
                      const date = res[prop].date
                      const jsDate = new Date()
                      jsDate.setMilliseconds(date.time)

                      const text = "DAY: " + date.date + "." +(date.month + 1)+ " TIME: "+ date.hours + ":" + date.minutes
                    //this.set('isEmpty',false);
                  //  const dateJS = Date(res[prop].date.)
                    entries.push({
                      key: prop,
                      date: text
                    });
                  }

                  viewModel.set("presentEntries", entries)
                  console.log("Taps: " + entries);
                  //page.getViewById("lv_entries").refresh();
                },
                err => {
                  console.log(err);
                }
              );
        }
    }

    initFirebase()

    return viewModel
}


function getSavedTaps(){
    return new Promise(function(resolve, reject) {
        const userId = getSavedUserId()
        let onQueryEvent = function(result) {
          // note that the query returns 1 match at a time
          // in the order specified in the query
          if (!result.error) {
            resolve(result.value);
          } else {
            console.log("Error" + result);
            reject(result.error);
          }
        };
  
        firebase.query(onQueryEvent, "/eats"+ "/" + userId, {
          singleEvent: true,
          orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: "createdAt"
          }
        });
      });
}

function getUserId(accessToken){
     var FACEBOOK_GRAPH_API_URL= "https://graph.facebook.com/v2.9"

    http.getJSON(FACEBOOK_GRAPH_API_URL + "/me?access_token=" + accessToken).then((res) => {
        console.log("facebook init result" + res)
        if(!res.error){
         appSettings.setString("username", res.name)
         appSettings.setString("userId", res.id)

         viewModel.set("userId", res.id);
         viewModel.set("username", res.name);
        }else{
            console.log("Error: " + error.message)
        }
      });
}

function saveTap(lastTap){
    console.log("saveTap")
    var userId = getSavedUserId()
    if(!userId)
    {
       console.log("User is undefined")
       return
    }

    if(firebaseDB){
        const tap = {
            date : lastTap
        }

        firebase.push(
            '/eats' + '/' + userId,
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

function getSavedUserId(){
    return appSettings.getString("userId")
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