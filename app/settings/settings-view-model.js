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
    });

    viewModel.onLogin = function onLogin(){
        alert("Login: ");

        facebookModule.login((err, fbData) => {
            if (err) {
              alert("Error during login: " + err.message);
            } else {
              console.log(fbData.token);
              appSettings.setString("access_token", fbData.token);
            }
          });
    }

    viewModel.goToDashboard =  function goToDashboard(){
             frameModule.topmost().navigate("dashboard/dashboard")
    }

    
    return viewModel
}



exports.createViewModel = createViewModel