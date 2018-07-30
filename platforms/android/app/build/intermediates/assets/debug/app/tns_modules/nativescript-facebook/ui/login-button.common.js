"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var loginManager = require("./../login-manager");
var LoginButtonBase = (function (_super) {
    __extends(LoginButtonBase, _super);
    function LoginButtonBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginButtonBase.prototype.initNativeView = function () {
        var _this = this;
        loginManager._registerLoginCallback(function (error, loginResponse) {
            _this.notify(({ eventName: LoginButtonBase.loginEvent, object: _this, error: error, loginResponse: loginResponse }));
        });
        loginManager._registerLogoutCallback(function () {
            _this.notify(({ eventName: LoginButtonBase.logoutEvent, object: _this }));
        });
    };
    return LoginButtonBase;
}(view_1.View));
LoginButtonBase.loginEvent = "login";
LoginButtonBase.logoutEvent = "logout";
exports.LoginButtonBase = LoginButtonBase;
function LoginButtonBase_tsickle_Closure_declarations() {
    LoginButtonBase.loginEvent;
    LoginButtonBase.logoutEvent;
}
