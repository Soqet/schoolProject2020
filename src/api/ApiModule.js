"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var Response_1 = require("./Response");
var Scope_1 = __importDefault(require("../db/Scope"));
var bodyParser = __importStar(require("body-parser"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var successMessage = 'success';
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
                        this.app.use(bodyParser.urlencoded({ 'extended': true }));
                        this.app.use(bodyParser.json());
                        this.app.post('/auth.register', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.authRegister(request.body['email'], request.body['password'], request.body['username'], request.body['name'])];
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
                                    case 0: return [4 /*yield*/, this.authGetToken(request.body['email'], request.body['password'], request.body['scope'], request.body['expiresin'])];
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
                                    case 0: return [4 /*yield*/, this.userChangeName(request.body['token'], request.body['currentname'], request.body['newname'])];
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
                                    case 0: return [4 /*yield*/, this.userChangePassword(request.body['token'], request.body['currentpassword'], request.body['newpassword'])];
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
                                    case 0: return [4 /*yield*/, this.userBlock(request.body['token'], request.body['username'])];
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
                                    case 0: return [4 /*yield*/, this.messagesGetLastMessages(request.body['token'])];
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
                                    case 0: return [4 /*yield*/, this.messagesGetLastMessage(request.body['token'], request.body['username'])];
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
                                    case 0: return [4 /*yield*/, this.messagesDeleteHistory(request.body['token'], request.body['username'])];
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
                                    case 0: return [4 /*yield*/, this.messagesMarkAsRead(request.body['token'], request.body['username'])];
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
                                    case 0: return [4 /*yield*/, this.messagesGetUnread(request.body['token'], request.body['username'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/messages.get', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.messagesGet(request.body['token'], request.body['username'], request.body['from'], request.body['to'])];
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
                                    case 0: return [4 /*yield*/, this.messagesSend(request.body['token'], request.body['username'], request.body['content'])];
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
                                    case 0: return [4 /*yield*/, this.userGetName(request.body['username'])];
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
                                    case 0: return [4 /*yield*/, this.userGetBlocked(request.body['token'])];
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
                                    case 0: return [4 /*yield*/, this.userGetDialogues(request.body['token'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/user.validatetoken', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.validateToken(request.body['token'])];
                                    case 1:
                                        result = _a.sent();
                                        response.send(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.app.post('/user.getfullinfo', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getFullInfo(request.body['token'])];
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
    ApiModule.prototype.getFullInfo = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.dbModule.checkStringToken(token, 'user.getfullinfo'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        return [4 /*yield*/, this.dbModule.getFullUserInfo(token)];
                    case 1:
                        result = _a.sent();
                        response = Response_1.Response.fromSuccessData(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        response = Response_1.Response.fromError(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.validateToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dbModule.validateStringToken(token)];
                    case 1:
                        result = _a.sent();
                        response = Response_1.Response.fromSuccessData(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        response = Response_1.Response.fromError(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.authGetToken = function (email, password, scope, expiresIn) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user, intScope, intExpiresIn, data, error_3;
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
                            throw Error('Incorrect password.');
                        intScope = new Scope_1.default(parseInt(scope));
                        intExpiresIn = parseInt(expiresIn);
                        if (!intScope) {
                            intScope = undefined;
                        }
                        if (!intExpiresIn) {
                            intExpiresIn = undefined;
                        }
                        console.log(scope, expiresIn, intExpiresIn, intScope);
                        return [4 /*yield*/, this.dbModule.createToken(user, intScope, intExpiresIn)];
                    case 3:
                        data = _a.sent();
                        response = Response_1.Response.fromSuccessData(data);
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        response = Response_1.Response.fromError(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.authRegister = function (email, password, username, name) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dbModule.createNewUser(email, password, username, name)];
                    case 1:
                        _a.sent();
                        response = Response_1.Response.fromSuccessData();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        response = Response_1.Response.fromError(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.messagesSend = function (token, username, content) {
        return __awaiter(this, void 0, void 0, function () {
            var response, message, _a, _b, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        if (!this.dbModule.checkStringToken(token, 'messages.send'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        _b = (_a = this.dbModule).sendMessage;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), username, content])];
                    case 2:
                        message = _c.sent();
                        response = Response_1.Response.fromSuccessData();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _c.sent();
                        console.log(error_5);
                        response = Response_1.Response.fromError(error_5.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.messagesGetUnread = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, _a, _b, _c, _d, _e, error_6;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 4, , 5]);
                        if (!this.dbModule.checkStringToken(token, 'messages.getunread'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        _b = (_a = this.dbModule).getUnreadWithUser;
                        _c = String;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1:
                        _d = [_c.apply(void 0, [(_f.sent()).toObject()._id])];
                        _e = String;
                        return [4 /*yield*/, this.dbModule.getUserByUsername(username)];
                    case 2: return [4 /*yield*/, _b.apply(_a, _d.concat([_e.apply(void 0, [(_f.sent()).toObject()._id])]))];
                    case 3:
                        result = _f.sent();
                        response = Response_1.Response.fromSuccessData(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _f.sent();
                        console.log(error_6);
                        response = Response_1.Response.fromError(error_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.messagesGet = function (token, username, from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var response, fromNumber, toNumber, result, _a, _b, _c, _d, _e, error_7;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 4, , 5]);
                        if (!this.dbModule.checkStringToken(token, 'messages.get'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        fromNumber = parseInt(from);
                        toNumber = parseInt(to);
                        //console.log(from, to, fromNumber, toNumber);
                        if ((!fromNumber && fromNumber != 0) || (!toNumber && toNumber != 0)) {
                            throw new Errors_1.DbValueError('Wrong numbers;');
                        }
                        _b = (_a = this.dbModule).getAllMessages;
                        _c = String;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1:
                        _d = [_c.apply(void 0, [(_f.sent()).toObject()._id])];
                        _e = String;
                        return [4 /*yield*/, this.dbModule.getUserByUsername(username)];
                    case 2: return [4 /*yield*/, _b.apply(_a, _d.concat([_e.apply(void 0, [(_f.sent()).toObject()._id]), fromNumber,
                            toNumber]))];
                    case 3:
                        result = _f.sent();
                        response = Response_1.Response.fromSuccessData(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_7 = _f.sent();
                        console.log(error_7);
                        response = Response_1.Response.fromError(error_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.messagesGetLastMessages = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, _a, _b, error_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        if (!this.dbModule.checkStringToken(token, 'messages.getlastmessages'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        _b = (_a = this.dbModule).getOneMessageFromEveryDialogue;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        result = _c.sent();
                        response = Response_1.Response.fromSuccessData(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _c.sent();
                        console.log(error_8);
                        response = Response_1.Response.fromError(error_8);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.messagesGetLastMessage = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result;
            return __generator(this, function (_a) {
                try {
                    if (!this.dbModule.checkStringToken(token, 'messages.getlasmessage'))
                        throw new Errors_1.ScopeError('Check token scope.');
                    result = successMessage;
                    response = Response_1.Response.fromSuccessData();
                }
                catch (error) {
                    console.log(error);
                    response = Response_1.Response.fromError(error);
                }
                return [2 /*return*/, response];
            });
        });
    };
    ApiModule.prototype.messagesMarkAsRead = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, _a, _b, _c, error_9;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        if (!this.dbModule.checkStringToken(token, 'messages.markasread'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        _b = (_a = this.dbModule).markAsRead;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1:
                        _c = [(_d.sent()).toObject()._id];
                        return [4 /*yield*/, this.dbModule.getUserByUsername(username)];
                    case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.sent()).toObject()._id]))];
                    case 3:
                        result = _d.sent();
                        response = Response_1.Response.fromSuccessData(result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_9 = _d.sent();
                        console.log(error_9);
                        response = Response_1.Response.fromError(error_9);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.messagesDeleteHistory = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result;
            return __generator(this, function (_a) {
                try {
                    if (!this.dbModule.checkStringToken(token, 'messages.deletehistory'))
                        throw new Errors_1.ScopeError('Check token scope.');
                    result = successMessage;
                    response = Response_1.Response.fromSuccessData();
                    return [2 /*return*/, String(result)];
                }
                catch (error) {
                    console.log(error);
                    response = Response_1.Response.fromError(error);
                }
                return [2 /*return*/, response];
            });
        });
    };
    ApiModule.prototype.userGetName = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dbModule.getUserByUsername(username)];
                    case 1:
                        result = _a.sent();
                        response = Response_1.Response.fromSuccessData(result.toObject().name);
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        console.log(error_10);
                        response = Response_1.Response.fromError(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.userGetBlocked = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, _a, _b, error_11;
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
                        response = Response_1.Response.fromSuccessData();
                        return [3 /*break*/, 4];
                    case 3:
                        error_11 = _c.sent();
                        console.log(error_11);
                        response = Response_1.Response.fromError(error_11);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.userGetDialogues = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, _a, _b, error_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        if (!this.dbModule.checkStringToken(token, 'user.getdialogues'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        _b = (_a = this.dbModule).getDialogues;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        data = _c.sent();
                        response = Response_1.Response.fromSuccessData(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_12 = _c.sent();
                        console.log(error_12);
                        response = Response_1.Response.fromError(error_12);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.userChangeName = function (token, currentName, newName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.dbModule.checkStringToken(token, 'user.changename'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        return [4 /*yield*/, this.dbModule.changeNameSafe(token, currentName, newName)];
                    case 1:
                        data = _a.sent();
                        response = Response_1.Response.fromSuccessData(data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        console.log(error_13);
                        response = Response_1.Response.fromError(error_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.userChangePassword = function (token, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.dbModule.checkStringToken(token, 'user.changepassword'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        return [4 /*yield*/, this.dbModule.changePasswordSafe(token, currentPassword, newPassword)];
                    case 1:
                        data = _a.sent();
                        response = Response_1.Response.fromSuccessData(data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _a.sent();
                        console.log(error_14);
                        response = Response_1.Response.fromError(error_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, response];
                }
            });
        });
    };
    ApiModule.prototype.userBlock = function (token, username) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, _a, _b, error_15;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        if (!this.dbModule.checkStringToken(token, 'user.block'))
                            throw new Errors_1.ScopeError('Check token scope.');
                        _b = (_a = this.dbModule).blockUser;
                        return [4 /*yield*/, this.dbModule.getUserByToken(token)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), username])];
                    case 2:
                        data = _c.sent();
                        response = Response_1.Response.fromSuccessData(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_15 = _c.sent();
                        console.log(error_15);
                        response = Response_1.Response.fromError(error_15);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    return ApiModule;
}());
exports.default = ApiModule;
//# sourceMappingURL=ApiModule.js.map