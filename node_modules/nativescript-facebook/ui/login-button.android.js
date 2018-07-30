"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_button_common_1 = require("./login-button.common");
var LoginButton = (function (_super) {
    __extends(LoginButton, _super);
    function LoginButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginButton.prototype.createNativeView = function () {
        return new com.facebook.login.widget.LoginButton(this._context);
    };
    return LoginButton;
}(login_button_common_1.LoginButtonBase));
exports.LoginButton = LoginButton;
