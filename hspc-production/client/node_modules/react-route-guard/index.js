"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var rxjs_1 = require("rxjs");
var SecureRouteLoggerConsoleTheme = {
    normal: '',
    testing: 'color: darkcyan; font-size: 0.7rem; font-style: italic;',
    important: 'color: green; font-size: 0.7rem; font-style: normal; font-weight: bold',
    error: 'color: red; font-size: 0.7rem; font-style: normal; font-weight: bold'
};
var debugLogger = function (className, methodName, msg, displayFormat, extraData) {
    var messageToPrint = displayFormat ? "%c[" + className + " - " + methodName + "] " + msg : "[" + className + " - " + methodName + "] " + msg;
    if (displayFormat) {
        if (extraData) {
            console.log(messageToPrint, displayFormat, extraData);
        }
        else {
            console.log(messageToPrint, displayFormat);
        }
    }
    else {
        if (extraData) {
            console.log(messageToPrint, extraData);
        }
        else {
            console.log(messageToPrint);
        }
    }
};
var SecureRoute = (function (_super) {
    __extends(SecureRoute, _super);
    function SecureRoute(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hasRouteGuard: _this.props.routeGuard ? true : false,
            routeGuardFinished: false,
            routeGuardResult: null
        };
        return _this;
    }
    SecureRoute.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tempRouteGuardResult;
            return __generator(this, function (_a) {
                if (!this.state.hasRouteGuard) {
                    return [2];
                }
                tempRouteGuardResult = this.props.routeGuard.shouldRoute();
                if (typeof (tempRouteGuardResult) === 'boolean') {
                    this.setState(function (prevState, props) { return ({
                        hasRouteGuard: prevState.hasRouteGuard,
                        routeGuardFinished: true,
                        routeGuardResult: tempRouteGuardResult
                    }); });
                }
                else if (tempRouteGuardResult instanceof Promise) {
                    tempRouteGuardResult.then(function (result) {
                        _this.setState(function (prevState, props) { return ({
                            hasRouteGuard: prevState.hasRouteGuard,
                            routeGuardFinished: true,
                            routeGuardResult: result
                        }); });
                    });
                }
                else if (tempRouteGuardResult instanceof rxjs_1.Observable) {
                    tempRouteGuardResult
                        .take(1)
                        .subscribe(function (result) {
                        _this.setState(function (prevState, props) { return ({
                            hasRouteGuard: prevState.hasRouteGuard,
                            routeGuardFinished: true,
                            routeGuardResult: result
                        }); });
                    });
                }
                return [2];
            });
        });
    };
    SecureRoute.prototype.render = function () {
        var successRoute = React.createElement(react_router_dom_1.Route, __assign({}, this.props));
        if (!this.state.hasRouteGuard) {
            if (this.props.enableDebug) {
                debugLogger(this.constructor.name, "render", "no route guard to run, render normal <Route> directly.", SecureRouteLoggerConsoleTheme.testing);
            }
            return successRoute;
        }
        var redirectPath = this.props.redirectToPathWhenFail ? this.props.redirectToPathWhenFail : '/';
        var failRedirect = React.createElement(react_router_dom_1.Redirect, { to: redirectPath });
        var failComponentRoute = this.props.componentWhenFail ? React.createElement(react_router_dom_1.Route, { path: this.props.path, component: this.props.componentWhenFail }) : null;
        if (this.state.routeGuardFinished) {
            if (this.props.enableDebug) {
                var debugMsg = "route guard passed, render <Route>.", className = this.constructor.name, debugTheme = SecureRouteLoggerConsoleTheme.testing;
                if (!this.state.routeGuardResult) {
                    debugMsg = "route guard fail, render <Redirect to=" + redirectPath + " />";
                    debugTheme = SecureRouteLoggerConsoleTheme.error;
                }
                debugLogger(className, "render", debugMsg, debugTheme);
            }
            if (this.state.routeGuardResult) {
                return successRoute;
            }
            else {
                return this.props.componentWhenFail ? failComponentRoute : failRedirect;
            }
        }
        else {
            return null;
        }
    };
    return SecureRoute;
}(React.Component));
exports.SecureRoute = SecureRoute;
