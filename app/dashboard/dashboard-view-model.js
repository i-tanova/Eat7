var Observable = require("data/observable").Observable;
const appSettings = require("application-settings");
var viewModel = new Observable();

function createViewModel(){
    var lastTapTime = appSettings.getNumber("lastTap")
    viewModel.message = getMessage(lastTapTime)

    viewModel.onTap = function onTap(){
           var lastTap = new Date().getMilliseconds()
           appSettings.setNumber("lastTap", lastTap)
           viewModel.message = getMessage(lastTap);
    }

    viewModel.onSettngsTap = function onSettingsTap(){

    }
    return viewModel
}


function getMessage(lastTapTime){
    console.log("getMessagess date now" + new Date())
    var date = new Date()
    date.setMilliseconds(lastTapTime  + (2 * 60 * 60 * 1000))
    var message = "Your next meal will be at " + date.toTimeString()
    console.log(message)
    return message
}

exports.createViewModel = createViewModel