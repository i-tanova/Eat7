let frameModule = require("tns-core-modules/ui/frame")
const appSettings = require("application-settings");

var createViewModel = require("./splash-view-model").createViewModel;

function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
    const user = appSettings.getString("username", "none");
    if(user === "none"){
        frameModule.topmost().navigate("tutorial/tutorial")
    }
}

exports.onNavigatedTo = onNavigatedTo