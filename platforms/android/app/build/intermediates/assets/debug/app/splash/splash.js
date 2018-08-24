

var createViewModel = require("./splash-view-model").createViewModel;

function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}

exports.onNavigatedTo = onNavigatedTo