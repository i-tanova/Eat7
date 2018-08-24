const slidesModule = require("nativescript-slides/nativescript-slides");
let frameModule = require("tns-core-modules/ui/frame")

function onNavigatedTo(args) {
    var page = args.object;
    var slides = page.getViewById("slides");
    slides.on(slidesModule.SlideContainer.finishedEvent, onSlideFinished, this)
}

function onSlideFinished() {
    
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
//"dashboard/dashboard",

exports.onNavigatedTo = onNavigatedTo