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
/////
/////
var newUser = new userModel_1.default({
    _id: new ObjectId(),
    email: 'qwe',
    passwordHash: 'asd',
    username: 'zxc',
    name: '123'
});
//newUser.save();
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
            var newToken, stringToken;
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
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
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
            var result, messagesDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(messagesModel_1.default, { fromId: user.toObject()._id })];
                    case 1:
                        result = (_a.sent())[0];
                        if (!(result == null)) return [3 /*break*/, 3];
                        messagesDocument = new messagesModel_1.default({
                            fromId: user.toObject()._id,
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
            var messages, _a, _b;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.getMessagesByUser(user)];
                    case 1:
                        messages = _e.sent();
                        _b = (_a = conversationModel_1.default).updateOne;
                        _c = {
                            'fromId': user.toObject()._id
                        };
                        _d = {};
                        return [4 /*yield*/, this.getUserByUsername(toUsername)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.histories = (_d.toId = (_e.sent()).toObject()._id,
                                _d),
                                _c), { $push: { histories: { messages: content } }
                            }])];
                    case 3:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //async getMessages
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
            var conversations, _a, _b, _c, error_1;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _f.sent();
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 5, , 6]);
                        _b = (_a = conversationModel_1.default).updateOne;
                        _c = [{ '_id': conversations.toObject()._id }];
                        _d = {};
                        _e = {};
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.$push = (_e.blocked = (_f.sent()).toObject()._id, _e), _d)]))];
                    case 4:
                        _f.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _f.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.getBlocked = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _a.sent();
                        return [2 /*return*/, conversations.toObject().blocked];
                }
            });
        });
    };
    DbModule.prototype.getDialogues = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _a.sent();
                        return [2 /*return*/, conversations.toObject().dialogues];
                }
            });
        });
    };
    DbModule.prototype.deleteDialogue = function (user, username) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, _a, _b, _c, error_2;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _f.sent();
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 5, , 6]);
                        _b = (_a = conversationModel_1.default).updateOne;
                        _c = [{ '_id': conversations.toObject()._id }];
                        _d = {};
                        _e = {};
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.$pull = (_e.dialogues = (_f.sent()).toObject()._id, _e), _d)]))];
                    case 4:
                        _f.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _f.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DbModule.prototype.addNewDialogue = function (user, username) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, _a, _b, _c, error_3;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.getConversationsByUser(user)];
                    case 1:
                        conversations = _f.sent();
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 5, , 6]);
                        _b = (_a = conversationModel_1.default).updateOne;
                        _c = [{ '_id': conversations.toObject()._id }];
                        _d = {};
                        _e = {};
                        return [4 /*yield*/, this.getUserByUsername(username)];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.$push = (_e.dialogues = (_f.sent()).toObject()._id, _e), _d)]))];
                    case 4:
                        _f.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _f.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return DbModule;
}());
exports.default = DbModule;
//# sourceMappingURL=DbModule.js.map