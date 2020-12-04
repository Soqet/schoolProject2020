"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
//modles end
var mongoose_1 = __importDefault(require("mongoose"));
var Errors_1 = require("../Errors");
var ObjectId = mongoose_1.default.Types.ObjectId;
function loggerMiddleware(request, response, next) {
    console.log(request.method + " " + request.path);
    next();
}
var ApiModule = /** @class */ (function () {
    function ApiModule(port, dbModule) {
        this.port = port;
        this.app = express_1.default();
        this.dbModule = dbModule;
    }
    ApiModule.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //this.app.use(express.json());
                        this.app.use(loggerMiddleware);
                        this.app.post('/auth.register', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.authRegister(request.query['email'], request.query['password'], request.query['username'], request.query['name'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/auth.gettoken', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.authGetToken(request.query['email'], request.query['password'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/user.changename', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.userChangeName(request.query['token'], request.query['currentname'], request.query['newname'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/user.changepassword', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.userChangePassword(request.query['token'], request.query['currentpassword'], request.query['newpassword'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/user.block', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.userBlock(request.query['token'], request.query['username'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/messages.getlastmessages', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.messagesGetLastMessages(request.query['token'], request.query['username'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/messages.getlastmessage', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.messagesGetLastMessage(request.query['token'], request.query['username'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/messages.deletehistory', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.messagesDeleteHistory(request.query['token'], request.query['username'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/messages.markasread', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.messagesMarkAsRead(request.query['token'], request.query['username'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/messages.getunread', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.messagesGetUnread(request.query['token'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/messages.send', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.messagesSend(request.query['token'], request.query['username'], request.query['randomnumber'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/user.getname', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.userGetName(request.query['username'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/user.getblocked', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.userGetBlocked(request.query['token'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/user.getdialogues', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.userGetDialogues(request.query['token'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.listen(this.port);
                        return [4 /*yield*/, this.dbModule.setup()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiModule.prototype.authGetToken = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.dbModule.getUserByEmail(email)];
                    case 1:
                        user = (_a.sent());
                        return [4 /*yield*/, this.dbModule.checkPassword(user, password)];
                    case 2:
                        if (!(_a.sent()))
                            return [2 /*return*/, 'Incorrect password.'];
                        return [4 /*yield*/, this.dbModule.createToken(user)];
                    case 3:
                        token = _a.sent();
                        return [2 /*return*/, token];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, 'Error'];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ApiModule.prototype.authRegister = function (email, password, username, name) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.dbModule.createNewUser(email, password, username, name)];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, '0'];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, String(error_2.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiModule.prototype.messagesSend = function (token, username, randomNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApiModule.prototype.messagesGetUnread = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApiModule.prototype.messagesGetLastMessages = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApiModule.prototype.messagesGetLastMessage = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApiModule.prototype.messagesMarkAsRead = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApiModule.prototype.messagesDeleteHistory = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApiModule.prototype.userGetName = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dbModule.getUserByUsername(username)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, String(result.toObject().name)];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, String(error_3.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiModule.prototype.userGetBlocked = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        if (!this.dbModule.checkStringToken(token, 'user.getblocked'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        _b = (_a = this.dbModule).getBlocked;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, String(result)];
                    case 3:
                        error_4 = _c.sent();
                        console.log(error_4);
                        return [2 /*return*/, String(error_4.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiModule.prototype.userGetDialogues = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        if (!this.dbModule.checkStringToken(token, 'user.getdialogues'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        _b = (_a = this.dbModule).getBlocked;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, String(result)];
                    case 3:
                        error_5 = _c.sent();
                        console.log(error_5);
                        return [2 /*return*/, String(error_5.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiModule.prototype.userChangeName = function (token, currentName, newName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.dbModule.checkStringToken(token, 'user.changename'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        return [4 /*yield*/, this.dbModule.changeNameSafe(token, currentName, newName)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2 /*return*/, String(error_6.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiModule.prototype.userChangePassword = function (token, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.dbModule.checkStringToken(token, 'user.changepassword'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        return [4 /*yield*/, this.dbModule.changePasswordSafe(token, currentPassword, newPassword)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_7 = _a.sent();
                        console.log(error_7);
                        return [2 /*return*/, String(error_7.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiModule.prototype.userBlock = function (token, username) {
    };
    return ApiModule;
}());
exports.default = ApiModule;
//# sourceMappingURL=ApiModule.js.map