"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeBytes = void 0;
var Errors_1 = require("../Errors");
var ScopeBytes;
(function (ScopeBytes) {
    ScopeBytes[ScopeBytes["fullScope"] = 15] = "fullScope";
    ScopeBytes[ScopeBytes["defaultScope"] = 15] = "defaultScope";
    ScopeBytes[ScopeBytes["getInfo"] = 1] = "getInfo";
    ScopeBytes[ScopeBytes["sendMessages"] = 2] = "sendMessages";
    ScopeBytes[ScopeBytes["readMessages"] = 4] = "readMessages";
    ScopeBytes[ScopeBytes["changeInfo"] = 8] = "changeInfo";
})(ScopeBytes = exports.ScopeBytes || (exports.ScopeBytes = {}));
var Scope = /** @class */ (function () {
    function Scope(scope) {
        /*private ApiMethods = {
          'user.getname':  ScopeBytes.getInfo,
          'user.changename': ScopeBytes.changeInfo,
          'user.changepassword': ScopeBytes.changeInfo,
          'messages.send': ScopeBytes.sendMessages,
          'message.deletehistory': ScopeBytes.sendMessages | ScopeBytes.readMessages,
          'message.block': ScopeBytes.sendMessages | ScopeBytes.readMessages,
          'messages.getunread': ScopeBytes.readMessages,
          'messages.markasread': ScopeBytes.readMessages,
          'messages.getlastmessages': ScopeBytes.readMessages,
          'messages.getlastmessage': ScopeBytes.readMessages,
        }*/
        this.ApiMethods = [
            { methodName: 'user.getname', methodScope: ScopeBytes.getInfo },
            { methodName: 'user.changename', methodScope: ScopeBytes.changeInfo },
            { methodName: 'user.changepassword', methodScope: ScopeBytes.changeInfo },
            { methodName: 'messages.send', methodScope: ScopeBytes.sendMessages },
            { methodName: 'message.deletehistory', methodScope: ScopeBytes.sendMessages | ScopeBytes.readMessages },
            { methodName: 'message.block', methodScope: ScopeBytes.sendMessages | ScopeBytes.readMessages },
            { methodName: 'messages.getunread', methodScope: ScopeBytes.readMessages },
            { methodName: 'messages.markasread', methodScope: ScopeBytes.readMessages },
            { methodName: 'messages.getlastmessages', methodScope: ScopeBytes.readMessages },
            { methodName: 'messages.getlastmessage', methodScope: ScopeBytes.readMessages },
            { methodName: 'user.getblocked', methodScope: ScopeBytes.readMessages },
            { methodName: 'user.getdialogues', methodScope: ScopeBytes.readMessages }
        ];
        this.scope = scope;
    }
    Scope.prototype.checkMethod = function (methodName) {
        var _a;
        var methodScope = (_a = this.ApiMethods.find(function (element) {
            return element.methodName == methodName;
        })) === null || _a === void 0 ? void 0 : _a.methodScope;
        if (methodScope == undefined)
            throw new Errors_1.ScopeError('Unknown method.');
        return (methodScope & this.scope) == methodScope;
    };
    return Scope;
}());
exports.default = Scope;
//# sourceMappingURL=Scope.js.map