import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

let userSchema = new mongoose.Schema({
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
        unique: true,
        ref: 'user'
      }
    }
  ],
  blocked: [
    {
      user: {
        type: ObjectId,
        unique: true,
        ref: 'user'
      }
    }
  ],
});


let conversationModel = mongoose.model('conversation', userSchema);
export default conversationModel;