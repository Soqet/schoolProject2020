import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

let messagesSchema = new mongoose.Schema({
  _id: ObjectId,
  fromId: {
    type: ObjectId,
    ref: 'user', 
    required: true
  },
  histories: { // key: toId
    type: Map,
    of: {
      messages : [{
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
  }
});


let messageModel = mongoose.model('message', messagesSchema);
export default messageModel;