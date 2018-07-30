var Observable = require("data/observable").Observable;
const appSettings = require("application-settings");
var viewModel = new Observable();
let frameModule = require("tns-core-modules/ui/frame")

function createViewModel(){
    var lastTapTime = appSettings.getNumber("lastTap")

    if(lastTapTime){
        viewModel.message = getMessage(lastTapTime)
    }

    viewModel.onTap = function onTap(){
           var lastTap = new Date().getMilliseconds()
           appSettings.setNumber("lastTap", lastTap)
           viewModel.set("message", getMessage(lastTap));
    }

    viewModel.onSettingsTap = function onSettingsTap(){
         //alert("OnTap")
         frameModule.topmost().navigate("settings/settings")
    }
    return viewModel
}


function getMessage(lastTapTime){
    console.log("getMessagess date now" + new Date())
    var date = new Date()
    var timeBetweenMeals =  appSettings.getNumber("timeBetweenMealsInHours")
    if(!timeBetweenMeals){
       timeBetweenMeals = 2
    }
    date.setMilliseconds(lastTapTime  + (timeBetweenMeals * 60 * 60 * 1000))
    var message = "Your next meal will be at " + date.toTimeString()
    console.log(message)
    return message
}

exports.createViewModel = createViewModel