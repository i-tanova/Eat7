"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_facebook_directives_1 = require("./nativescript-facebook-directives");
var NativeScriptFacebookModule = (function () {
    function NativeScriptFacebookModule() {
    }
    return NativeScriptFacebookModule;
}());
NativeScriptFacebookModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [nativescript_facebook_directives_1.DIRECTIVES],
                exports: [nativescript_facebook_directives_1.DIRECTIVES],
            },] },
];
NativeScriptFacebookModule.ctorParameters = function () { return []; };
exports.NativeScriptFacebookModule = NativeScriptFacebookModule;
function NativeScriptFacebookModule_tsickle_Closure_declarations() {
    NativeScriptFacebookModule.decorators;
    NativeScriptFacebookModule.ctorParameters;
}
element_registry_1.registerElement("FacebookLoginButton", function () { return require("../").LoginButton; });
