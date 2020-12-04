"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var tokenSchema = new mongoose_1.default.Schema({
    //_id: ObjectId,
    token: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    scope: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});
var tokenModel = mongoose_1.default.model('token', tokenSchema);
exports.default = tokenModel;
//# sourceMappingURL=tokenModel.js.map