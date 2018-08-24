let frameModule = require("tns-core-modules/ui/frame")
const appSettings = require("application-settings");

function createViewModel(){
    const user = appSettings.getString("username", "none");
    if(user === "none"){
        frameModule.topmost().navigate("tutorial/tutorial")
    }else{
        //TODO navigate to wellcome
    }
}

exports.createViewModel = createViewModel