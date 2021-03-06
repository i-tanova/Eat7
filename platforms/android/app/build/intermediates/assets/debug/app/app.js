/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

require("./bundle-config");
var application = require("application");
const frameModule = require("tns-core-modules/ui/frame");


frameModule.Frame.defaultTransition = { name: "flipLeft" };

var facebookModule = require("nativescript-facebook");


application.on(application.launchEvent, function (args) {
    facebookModule.init("513233832451187");
});

application.run({ moduleName: "app-root" });



/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
