"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var messagesSchema = new mongoose_1.default.Schema({
    _id: ObjectId,
    fromId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    histories: [
        {
            toId: {
                type: ObjectId,
                ref: 'user',
                required: true
            },
            messages: [{
                    content: {
                        type: String
                    },
                    date: {
                        type: String,
                        required: true
                    },
                    unread: {
                        type: Boolean,
                        required: true
                    }
                }],
            unread: {
                type: Boolean,
                required: true
            }
        }
    ],
});
var messageModel = mongoose_1.default.model('message', messagesSchema);
exports.default = messageModel;
//# sourceMappingURL=messagesModel.js.map