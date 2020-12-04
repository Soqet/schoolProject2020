"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var userSchema = new mongoose_1.default.Schema({
    user: {
        type: ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    dialogues: [
        {
            user: {
                type: ObjectId,
                ref: 'user'
            }
        }
    ],
    blocked: [
        {
            user: {
                type: ObjectId,
                ref: 'user'
            }
        }
    ],
});
var conversationModel = mongoose_1.default.model('conversation', userSchema);
exports.default = conversationModel;
//# sourceMappingURL=conversationModel.js.map