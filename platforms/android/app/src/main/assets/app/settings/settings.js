let frameModule = require("tns-core-modules/ui/frame")
const appSettings = require("application-settings");
let facebookModule = require("nativescript-facebook")

var createViewModel = require("./settings-view-model").createViewModel;

function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}

exports.onNavigatedTo = onNavigatedTo