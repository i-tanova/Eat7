"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_response_1 = require("./login-response");
var login_behavior_1 = require("./login-behavior");
var facebook_access_token_1 = require("./facebook-access-token");
var LOGIN_PERMISSIONS = ["public_profile", "email"];
var loginManager;
function init(fbId, fbLoginBehavior) {
    if (fbLoginBehavior === void 0) { fbLoginBehavior = login_behavior_1.LoginBehavior.LoginBehaviorBrowser; }
    setAppId(fbId);
    loginManager = FBSDKLoginManager.alloc().init();
    loginManager.loginBehavior = fbLoginBehavior;
}
exports.init = init;
function _registerLogoutCallback(callback) {
    exports.onLogoutCallback = callback;
}
exports._registerLogoutCallback = _registerLogoutCallback;
function _registerLoginCallback(callback) {
    exports.onLoginCallback = function (result, error) {
        if (error) {
            callback(new Error(error.localizedDescription));
            return;
        }
        if (!result) {
            callback(new Error("Fatal error"));
            return;
        }
        if (result.isCancelled) {
            callback(new Error('canceled'));
            return;
        }
        if (result.token) {
            var token = result.token.tokenString;
            var loginResponse = new login_response_1.LoginResponse(token);
            callback(null, loginResponse);
        }
        else {
            callback(new Error("Could not acquire an access token"));
            return;
        }
    };
}
exports._registerLoginCallback = _registerLoginCallback;
function setAppId(fbAppId) {
    FBSDKSettings.setAppID(fbAppId);
}
function requestPublishPermissions(permissions, callback) {
    _registerLoginCallback(callback);
    loginManager.logInWithPublishPermissionsHandler(permissions, exports.onLoginCallback);
}
exports.requestPublishPermissions = requestPublishPermissions;
function requestReadPermissions(permissions, callback) {
    _registerLoginCallback(callback);
    loginManager.logInWithReadPermissionsHandler(permissions, exports.onLoginCallback);
}
exports.requestReadPermissions = requestReadPermissions;
function login(callback) {
    requestReadPermissions(LOGIN_PERMISSIONS, callback);
}
exports.login = login;
function getCurrentAccessToken() {
    var sdkAccessToken = FBSDKAccessToken.currentAccessToken();
    var accessToken = null;
    if (sdkAccessToken) {
        accessToken = new facebook_access_token_1.FacebookAccessToken();
        accessToken.accessToken = sdkAccessToken.tokenString;
        accessToken.userId = sdkAccessToken.userID;
        accessToken.refreshDate = sdkAccessToken.refreshDate;
        accessToken.expirationDate = sdkAccessToken.expirationDate;
    }
    return accessToken;
}
exports.getCurrentAccessToken = getCurrentAccessToken;
function logout(callback) {
    loginManager.logOut();
    if (callback) {
        callback();
    }
}
exports.logout = logout;
