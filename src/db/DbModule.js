"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var DbBuffer_1 = __importDefault(require("./DbBuffer"));
var bcrypt_1 = require("bcrypt");
var Errors_1 = require("../Errors");
//models start
var userModel_1 = __importDefault(require("./models/userModel"));
var tokenModel_1 = __importDefault(require("./models/tokenModel"));
var messagesModel_1 = __importDefault(require("./models/messagesModel"));
var conversationModel_1 = __importDefault(require("./models/conversationModel"));
var mongodb_1 = require("mongodb");
//models end
var Scope_1 = __importStar(require("./Scope"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var DbModule = /** @class */ (function () {
    function DbModule(uri) {
        this.dbBuffer = new DbBuffer_1.default();
        this.uri = uri;
        this.isReady = false;
    }
    DbModule.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isReady) return [3 /*break*/, 2];
                        return [4 /*yield*/, mongoose_1.default.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })];
                    case 1:
                        _a.sent();
                        this.isReady = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.save = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, object.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.deleteById = function (model, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.findByIdAndDelete(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.findById = function (model, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.findById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //await hash(user.toJSON()._id as string + (Math.random() as any as string), 10)
    DbModule.prototype.createToken = function (user, scope, expiresIn) {
        return __awaiter(this, void 0, void 0, function () {
            var newToken, stringToken, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newToken = new tokenModel_1.default({
                            token: String(new ObjectId),
                            userId: user.toObject()._id,
                            scope: scope == undefined ? Scope_1.ScopeBytes.defaultScope : scope,
                            expiresIn: undefined == expiresIn ? 0 : expiresIn,
                            date: (new Date()).getMilliseconds(),
                            passwordHash: user.toObject().passwordHash
                        });
                        stringToken = newToken.toObject().token;
                        return [4 /*yield*/, this.save(newToken)];
                    case 1:
                        _a.sent();
                        result = {
                            name: user.toObject().name,
                            username: user.toObject().username,
                            token: stringToken
                        };
                        return [2 /*return*/, stringToken];
                }
            });
        });
    };
    DbModule.prototype.createNewUser = function (email, password, username, name) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, _a, newConversations;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = userModel_1.default.bind;
                        _b = {
                            _id: new ObjectId(),
                            email: email
                        };
                        return [4 /*yield*/, bcrypt_1.hash(password, 10)];
                    case 1:
                        newUser = new (_a.apply(userModel_1.default, [void 0, (_b.passwordHash = _c.sent(),
                                _b.username = username,
                                _b.name = name,
                                _b)]))();
                        return [4 /*yield*/, this.save(newUser)];
                    case 2:
                        _c.sent();
                        newConversations = new conversationModel_1.default({ user: newUser.toObject()._id });
                        return [4 /*yield*/, this.save(newConversations)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, newUser];
                }
            });
        });
    };
    DbModule.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(userModel_1.default, { email: email })];
                    case 1:
                        result = (_a.sent())[0];
                        if (result == null)
                            throw new Errors_1.DbValueError("User with this email (" + email + ") does not exist.");
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.getUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(userModel_1.default, { username: username })];
                    case 1:
                        result = (_a.sent())[0];
                        if (result == null)
                            throw new Errors_1.DbValueError("User with this username (" + username + ") does not exist.");
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(userModel_1.default, { _id: id })];
                    case 1:
                        result = (_a.sent())[0];
                        if (result == null)
                            throw new Errors_1.DbValueError("User with this id (" + id + ") does not exist.");
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.findByIdAndUpdate = function (model, id, changes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.findByIdAndUpdate(id, changes)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.updateSafe = function (document, changes, current) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (document == null)
                            throw new Errors_1.DbValueError("Expected to get document.");
                        return [4 /*yield*/, this.checkValues(document, current)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        return [4 /*yield*/, document.updateOne(changes)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.checkValues = function (document, object) {
        return __awaiter(this, void 0, void 0, function () {
            var source, _i, _a, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (document == null)
                            throw new Errors_1.DbValueError("Expected to get document.");
                        return [4 /*yield*/, document.toObject()];
                    case 1:
                        source = _b.sent();
                        if (source == null)
                            throw new Errors_1.DbError("Document is empty.");
                        for (_i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
                            key = _a[_i];
                            if (!source.hasOwnProperty(key) || (source[key] != object[key]))
                                return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    DbModule.prototype.find = function (model, object) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.find(object)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DbModule.prototype.checkPassword = function (user, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.compare(password, user.toObject().passwordHash)];
                    case 1: //password is plain text
                    //console.log(password, user.toObject().passwordHash, await compare(password, user.toObject().passwordHash));
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DbModule.prototype.getUserByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenDocument, userDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(tokenModel_1.default, { token: token })];
                    case 1:
                        tokenDocument = (_a.sent())[0];
                        if (tokenDocument == undefined)
                            throw new Errors_1.DbValueError("Token is not exists..");
                        return [4 /*yield*/, this.findById(userModel_1.default, tokenDocument.toObject().userId)];
                    case 2:
                        userDocument = _a.sent();
                        if (userDocument == null)
                            throw new Errors_1.DbValueError('Owner of this token does not exist.');
                        return [2 /*return*/, userDocument];
                }
            });
        });
    };
    DbModule.prototype.getToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(tokenModel_1.default, { token: token })];
                    case 1:
                        tokenDocument = (_a.sent())[0];
                        if (tokenDocument == undefined)
                            throw new Errors_1.DbValueError("Token is not exists..");
                        return [2 /*return*/, tokenDocument];
                }
            });
        });
    };
    DbModule.prototype.checkToken = function (token, methodName) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByToken(token.toObject().token)];
                    case 1:
                        user = _a.sent();
                        if (token.toObject().passwordHash != user.toObject().passwordHash)
                            return [2 /*return*/, false];
                        if (token.toObject().expiresIn + token.toObject().date < (new Date()).getMilliseconds())
                            return [2 /*return*/, false];
                        if (methodName != undefined || (new Scope_1.default(token.toObject().scope)).checkMethod(String(methodName)))
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    DbModule.prototype.changePasswordSafe = function (token, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenDocument, userDocument, result, newpasswordHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken(token)];
                    case 1:
                        tokenDocument = _a.sent();
                        return [4 /*yield*/, this.getUserByToken(token)];
                    case 2:
                        userDocument = _a.sent();
                        return [4 /*yield*/, this.checkPassword(userDocument, currentPassword)];
                    case 3:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 7];
                        return [4 /*yield*/, bcrypt_1.hash(newPassword, 10)];
                    case 4:
                        newpasswordHash = _a.sent();
                        //console.log(asd);
                        return [4 /*yield*/, userDocument.updateOne({ passwordHash: newpasswordHash })];
                    case 5:
                        //console.log(asd);
                        _a.sent();
                        return [4 /*yield*/, this.createToken(userDocument, tokenDocument.toObject().scope, tokenDocument.toObject().expiresIn)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: throw new Errors_1.DbValueError('Incorrect password.');
                }
            });
        });
    };
    DbModule.prototype.checkStringToken = function (token, methodName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.checkToken;
                        return [4 /*yield*/, this.getToken(token)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent(), methodName])];
                }
            });
        });
    };
    DbModule.prototype.validateToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByToken(token.toObject().token)];
                    case 1:
                        user = _a.sent();
                        if (token.toObject().passwordHash != user.toObject().passwordHash)
                            return [2 /*return*/, false];
                        if (token.toObject().expiresIn + token.toObject().date < (new Date()).getMilliseconds())
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    DbModule.prototype.validateStringToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.validateToken;
                        return [4 /*yield*/, this.getToken(token)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    DbModule.prototype.getOneMessageFromEveryUnread = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, userId, username, dialogues, result, id, messages, _i, dialogues_1, dialogue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _a.sent();
                        userId = String(user.toObject()._id);
                        username = String(user.toObject().username);
                        return [4 /*yield*/, conversations.toObject().dialogues];
                    case 2:
                        dialogues = _a.sent();
                        result = new Array();
                        _i = 0, dialogues_1 = dialogues;
                        _a.label = 3;
                    case 3:
                        if (!(_i < dialogues_1.length)) return [3 /*break*/, 6];
                        dialogue = dialogues_1[_i];
                        id = String(dialogue.user);
                        return [4 /*yield*/, this.getUnreadWithUser(id, userId)];
                    case 4:
                        // let messages = await this.getMessagesById(id);
                        // console.log()
                        // if(!!messages.toObject().histories.get(userId) && messages.toObject().histories.get(userId).unread) {
                        //   result.push({...(messages.toObject().histories.get(userId).messages.slice(-1)), 
                        //     fromUsername: (await (await this.getUserById(id)).toObject()).username,
                        //     toUsername: (await user.toObject().username)
                        //   });
                        // }
                        messages = _a.sent();
                        //console.log(messages)
                        if (!!messages) {
                            if (!!messages.messages[messages.messages.length - 1]) {
                                result.push(messages.messages[messages.messages.length - 1]);
                            }
                        }
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.getOneMessageFromEveryDialogue = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, userId, dialogues, result, _i, dialogues_2, id, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _a.sent();
                        userId = user.toObject()._id;
                        return [4 /*yield*/, conversations.toObject().dialogues];
                    case 2:
                        dialogues = _a.sent();
                        result = new Array();
                        _i = 0, dialogues_2 = dialogues;
                        _a.label = 3;
                    case 3:
                        if (!(_i < dialogues_2.length)) return [3 /*break*/, 6];
                        id = dialogues_2[_i];
                        return [4 /*yield*/, this.getMessagesById(id)];
                    case 4:
                        messages = _a.sent();
                        result.push((messages.toObject().histories.get(userId).messages.slice(-1)));
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.changeNameSafe = function (token, currentName, newName) {
        return __awaiter(this, void 0, void 0, function () {
            var userDocument, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByToken(token)];
                    case 1:
                        userDocument = _a.sent();
                        return [4 /*yield*/, this.updateSafe(userDocument, { name: newName }, { name: currentName })];
                    case 2:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, newName];
                        else
                            throw new Errors_1.DbValueError('Wrong current name.');
                        return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.getMessagesByUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user.toObject()._id];
                    case 1:
                        userId = _a.sent();
                        return [4 /*yield*/, this.getMessagesById(userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DbModule.prototype.getMessagesById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, messagesDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(messagesModel_1.default, { fromId: userId })];
                    case 1:
                        result = (_a.sent())[0];
                        if (!(result == null)) return [3 /*break*/, 3];
                        messagesDocument = new messagesModel_1.default({
                            _id: new mongodb_1.ObjectID(),
                            fromId: userId,
                            histories: []
                        });
                        result = messagesDocument;
                        return [4 /*yield*/, this.save(messagesDocument)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.sendMessage = function (user, toUsername, content) {
        return __awaiter(this, void 0, void 0, function () {
            var userBlocked, toUserDoc, toUserBlocked, toUserId, _a, message, updateUnread;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (user.toObject().username == toUsername)
                            throw new Errors_1.DbError('You can not send messages to yourself.');
                        return [4 /*yield*/, this.getBlocked(user)];
                    case 1:
                        userBlocked = _b.sent();
                        if (userBlocked.includes({ username: toUsername }))
                            throw new Errors_1.DbError('You blocked this user.');
                        return [4 /*yield*/, this.getUserByUsername(toUsername)];
                    case 2:
                        toUserDoc = _b.sent();
                        return [4 /*yield*/, this.getBlocked(toUserDoc)];
                    case 3:
                        toUserBlocked = _b.sent();
                        if (toUserBlocked.includes({ username: user.toObject().username }))
                            throw new Errors_1.DbError('You blocked by this user.');
                        _a = String;
                        return [4 /*yield*/, this.getUserByUsername(toUsername)];
                    case 4:
                        toUserId = _a.apply(void 0, [(_b.sent()).toObject()._id]);
                        message = {};
                        //console.log(toUserId);
                        message["histories." + toUserId + ".messages"] = {
                            content: content,
                            date: Date.now().toString(),
                            unread: true
                        };
                        return [4 /*yield*/, messagesModel_1.default.updateOne({
                                'fromId': user.toObject()._id
                            }, { $push: message })];
                    case 5:
                        _b.sent();
                        updateUnread = {};
                        updateUnread["histories." + toUserId + ".unread"] = true;
                        return [4 /*yield*/, messagesModel_1.default.updateOne({
                                'fromId': user.toObject()._id
                            }, updateUnread)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.addNewDialogue(user, toUsername)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.addNewDialogue(toUserDoc, user.toObject().username)];
                    case 8:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.getMessages = function (fromId, toId, amount) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, rawResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = {
                            fromId: fromId,
                            toId: toId,
                            messages: new Array()
                        };
                        return [4 /*yield*/, messagesModel_1.default.findOne({ fromId: fromId })];
                    case 1:
                        rawResult = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.toObject();
                        if (rawResult == null)
                            throw new Errors_1.DbError(fromId + " is unknonwn user id.");
                        try {
                            if (!amount)
                                result.messages = (rawResult.histories.get(toId).messages.toObject()).slice(-amount);
                            else
                                result.messages = (rawResult.histories.get(toId).messages.toObject()).reverse();
                        }
                        finally {
                            //console.log({...result})
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.getAllMessages = function (firstId, secondId, fromNumber, toNumber) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var firstMessages, secondMessages, firstUsername, secondUsername, result, firstCounter, secondCounter, allMessages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getMessagesById(firstId)];
                    case 1:
                        firstMessages = (_b.sent()).toObject().histories.get(secondId);
                        return [4 /*yield*/, this.getMessagesById(secondId)];
                    case 2:
                        secondMessages = (_b.sent()).toObject().histories.get(firstId);
                        //console.log(firstMessages, secondMessages)
                        if (!!firstMessages)
                            firstMessages = firstMessages.messages.reverse();
                        if (!!secondMessages)
                            secondMessages = secondMessages.messages.reverse();
                        if (!firstMessages)
                            firstMessages = [];
                        if (!secondMessages)
                            secondMessages = [];
                        //console.log(firstMessages, secondMessages);
                        if (!firstMessages && !secondMessages) {
                            throw new Errors_1.DbError('Users have not messages with each other.');
                        }
                        return [4 /*yield*/, this.getUserById(firstId)];
                    case 3:
                        firstUsername = (_b.sent()).toObject().username;
                        return [4 /*yield*/, this.getUserById(secondId)];
                    case 4:
                        secondUsername = (_b.sent()).toObject().username;
                        result = new Array();
                        firstCounter = 0;
                        secondCounter = 0;
                        /*for(let i = 0; (i <= toNumber) && (!!firstMessages || !!secondMessages); i++) {
                          //console.log(firstMessages[firstCounter]?.date, secondMessages[secondCounter]?.date);
                          if(this.compareMessagesDates(firstMessages, firstCounter, secondMessages, secondCounter)) {
                            result.push({...firstMessages[firstCounter]?.toObject(), fromUsername: firstUsername, toUsername: secondUsername});
                            firstCounter++;
                          } else if (this.compareMessagesDates(secondMessages, secondCounter, firstMessages, firstCounter)) {
                            result.push({...secondMessages[secondCounter]?.toObject(), fromUsername: secondUsername, toUsername: firstUsername});
                            secondCounter++;
                          } else {
                            result.push(null as any as IMessage);
                            break;
                          }
                          if(!result[result.length - 1]?.hasOwnProperty('content')) {
                            result[result.length - 1] = null as any as IMessage;
                            break;
                          }
                        }*/
                        //if (!firstMessages) firstMessages = [];
                        //if (!secondMessages) secondMessages = [];
                        //console.log(firstMessages, secondMessages);
                        //
                        // firstMessages.forEach((element: IMessage) => {
                        //   element.fromUsername = firstUsername;
                        //   element.toUsername = secondUsername;
                        //   console.log(1);
                        // });
                        // secondMessages.forEach((element: IMessage) => {
                        //   element.fromUsername = secondUsername;
                        //   element.toUsername = firstUsername;
                        //   console.log(2)
                        // });
                        firstMessages = firstMessages.map(function (obj) { return (__assign(__assign({}, obj.toObject()), { fromUsername: firstUsername, toUsername: secondUsername })); });
                        secondMessages = secondMessages.map(function (obj) { return (__assign(__assign({}, obj.toObject()), { fromUsername: secondUsername, toUsername: firstUsername })); });
                        allMessages = __spreadArrays(firstMessages, secondMessages).sort(function (a, b) {
                            if (a.date < b.date) {
                                return -1;
                            }
                            if (a.date > b.date) {
                                return 1;
                            }
                            return 0;
                        });
                        if (!((_a = result[result.length - 1]) === null || _a === void 0 ? void 0 : _a.hasOwnProperty('content'))) {
                            result[result.length - 1] = null;
                        }
                        result = allMessages;
                        //console.log(result)
                        //result.reverse();
                        return [2 /*return*/, result.slice(fromNumber, toNumber + 1)];
                }
            });
        });
    };
    DbModule.prototype.compareMessagesDates = function (first, firstIndex, second, secondIndex) {
        if (!first || !first[firstIndex]) {
            return false;
        }
        if (!second || !second[secondIndex]) {
            return true;
        }
        return (parseInt(first[firstIndex].date) < parseInt(second[secondIndex].date));
    };
    DbModule.prototype.changeId = function (model, document) {
        return __awaiter(this, void 0, void 0, function () {
            var newObject, newDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newObject = document.toObject();
                        newObject._id = new mongodb_1.ObjectID;
                        newDocument = new model(newObject);
                        return [4 /*yield*/, document.deleteOne()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.save(newDocument)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newDocument];
                }
            });
        });
    };
    DbModule.prototype.getName = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByUsername(username)];
                    case 1: return [2 /*return*/, (_a.sent()).toObject().name];
                }
            });
        });
    };
    DbModule.prototype.getConversationsByUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(conversationModel_1.default, { user: user.toObject()._id })];
                    case 1:
                        result = (_a.sent())[0];
                        if (result == null)
                            throw new Errors_1.DbError("Conversations for this user does not exist.");
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.blockUser = function (user, username) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, _a, _b, _c, _d, _e, _f, error_1;
            var _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _l.sent();
                        _l.label = 2;
                    case 2:
                        _l.trys.push([2, 8, , 9]);
                        _b = (_a = conversationModel_1.default).findOne;
                        _g = { '_id': conversations.toObject()._id };
                        _c = 'blocked.user';
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 3: return [4 /*yield*/, _b.apply(_a, [(_g[_c] = (_l.sent()).toObject()._id, _g)])];
                    case 4:
                        if (!!(_l.sent())) return [3 /*break*/, 7];
                        _e = (_d = conversationModel_1.default).updateOne;
                        _f = [{ '_id': conversations.toObject()._id }];
                        _h = {};
                        _j = {};
                        _k = {};
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 5: return [4 /*yield*/, _e.apply(_d, _f.concat([(_h.$push = (_j.blocked = (_k.user = (_l.sent()).toObject()._id, _k), _j), _h)]))];
                    case 6:
                        _l.sent();
                        _l.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _l.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.convertArrayOfIdToUsernames = function (array) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, array_1, element, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, array_1 = array;
                        _b.label = 1;
                    case 1:
                        if (!(_i < array_1.length)) return [3 /*break*/, 4];
                        element = array_1[_i];
                        //console.log(element)
                        _a = element;
                        return [4 /*yield*/, this.convertIdToUsername(String(element.user))];
                    case 2:
                        //console.log(element)
                        _a.username = _b.sent();
                        element.user = undefined;
                        element._id = undefined;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.getBlocked = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _a.sent();
                        result = conversations.toObject().blocked;
                        return [4 /*yield*/, this.convertArrayOfIdToUsernames(result)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.getDialogues = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _a.sent();
                        result = conversations.toObject().dialogues;
                        return [4 /*yield*/, this.convertArrayOfIdToUsernames(result)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DbModule.prototype.getUnreadWithUser = function (fromId, toId) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, fromUsername, _a, toUsername, _b, unreadMessages, _i, _c, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getMessages(fromId, toId)];
                    case 1:
                        messages = (_d.sent());
                        _a = String;
                        return [4 /*yield*/, this.getUserById(fromId)];
                    case 2: return [4 /*yield*/, (_d.sent()).toObject().username];
                    case 3:
                        fromUsername = _a.apply(void 0, [_d.sent()]);
                        _b = String;
                        return [4 /*yield*/, this.getUserById(toId)];
                    case 4: return [4 /*yield*/, (_d.sent()).toObject().username];
                    case 5:
                        toUsername = _b.apply(void 0, [_d.sent()]);
                        unreadMessages = {
                            fromId: fromId,
                            toId: toId,
                            messages: new Array()
                        };
                        try {
                            //console.log('cool1')
                            for (_i = 0, _c = messages.messages; _i < _c.length; _i++) {
                                message = _c[_i];
                                if (message.unread) {
                                    unreadMessages.messages.push(__assign(__assign({}, message), { fromUsername: fromUsername, toUsername: toUsername }));
                                }
                            }
                            //console.log('cool2')
                        }
                        finally {
                            return [2 /*return*/, unreadMessages];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.convertIdToUsername = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //console.log(id);
                        if (!id)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, this.getUserById(id)];
                    case 1:
                        userDocument = _a.sent();
                        return [2 /*return*/, userDocument.toObject().username];
                }
            });
        });
    };
    DbModule.prototype.deleteDialogue = function (user, username) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, _a, _b, _c, error_2;
            var _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _g.sent();
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 5, , 6]);
                        _b = (_a = conversationModel_1.default).updateOne;
                        _c = [{ '_id': conversations.toObject()._id }];
                        _d = {};
                        _e = {};
                        _f = {};
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.$pull = (_e.dialogues = (_f.user = (_g.sent()).toObject()._id, _f), _e), _d)]))];
                    case 4:
                        _g.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _g.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.unblockUser = function (user, username) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, _a, _b, _c, error_3;
            var _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _g.sent();
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 5, , 6]);
                        _b = (_a = conversationModel_1.default).updateOne;
                        _c = [{ '_id': conversations.toObject()._id }];
                        _d = {};
                        _e = {};
                        _f = {};
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.$pull = (_e.blocked = (_f.user = (_g.sent()).toObject()._id, _f), _e), _d)]))];
                    case 4:
                        _g.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _g.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.addNewDialogue = function (user, username) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, _a, _b, _c, _d, _e, _f, error_4;
            var _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _l.sent();
                        _l.label = 2;
                    case 2:
                        _l.trys.push([2, 8, , 9]);
                        _b = (_a = conversationModel_1.default).findOne;
                        _g = { '_id': conversations.toObject()._id };
                        _c = 'dialogues.user';
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 3: return [4 /*yield*/, _b.apply(_a, [(_g[_c] = (_l.sent()).toObject()._id, _g)])];
                    case 4:
                        if (!!(_l.sent())) return [3 /*break*/, 7];
                        _e = (_d = conversationModel_1.default).updateOne;
                        _f = [{ '_id': conversations.toObject()._id }];
                        _h = {};
                        _j = {};
                        _k = {};
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 5: return [4 /*yield*/, _e.apply(_d, _f.concat([(_h.$addToSet = (_j.dialogues = (_k.user = (_l.sent()).toObject()._id, _k), _j), _h)]))];
                    case 6:
                        _l.sent();
                        _l.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_4 = _l.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.markAsRead = function (fromId, toId) {
        return __awaiter(this, void 0, void 0, function () {
            var findObject, updateObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findObject = {};
                        findObject['fromId'] = fromId;
                        updateObject = {};
                        updateObject["histories." + toId + ".unread"] = false;
                        updateObject["histories." + toId + ".messages.$[].unread"] = false;
                        /*let result = */ return [4 /*yield*/, messagesModel_1.default.updateMany(findObject, { $set: updateObject })];
                    case 1:
                        /*let result = */ _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.getFullUserInfo = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByToken(token)];
                    case 1:
                        user = (_a.sent()).toObject();
                        ;
                        result = {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            token: token,
                            name: user.name
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return DbModule;
}());
exports.default = DbModule;
//# sourceMappingURL=DbModule.js.map