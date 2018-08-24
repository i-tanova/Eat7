var Observable = require("data/observable").Observable;
const appSettings = require("application-settings");
var viewModel = new Observable();
let frameModule = require("tns-core-modules/ui/frame")
let facebookModule = require("nativescript-facebook")

function createViewModel(){
    var timeInHours = appSettings.getNumber("timeBetweenMealsInHours")
  

    if(timeInHours){
        viewModel.timeBetweenMeals = timeInHours
    }else{
        viewModel.timeBetweenMeals = 2
    }

    viewModel.addEventListener(Observable.propertyChangeEvent, (args) => {
        if(args.propertyName == "timeBetweenMeals"){
            appSettings.setNumber("timeBetweenMealsInHours", parseInt(args.value))
            alert("Value chnaged")
        }
        // // args is of type PropertyChangeData
        // console.log("propertyChangeEvent [eventName]: ", args.eventName);
        // console.log("propertyChangeEvent [propertyName]: ", args.propertyName);
        // console.log("propertyChangeEvent [value]: ", args.value);
        // console.log("propertyChangeEvent [oldValue]: ", args.oldValue);
    });

    viewModel.onLogin = function onLogin(){
        alert("Login: ");

        facebookModule.login((err, fbData) => {
            if (err) {
              alert("Error during login: " + err.message);
            } else {
              console.log(fbData.token);
              appSettings.setString("access_token", fbData.token)
            }
          });
    }
    return viewModel
}



exports.createViewModel = createViewModel