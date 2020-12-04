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
        ref: 'user',
        unique: true
      }
    }
  ],
  blocked: [
    {
      user: {
        type: ObjectId,
        ref: 'user',
        unique: true
      }
    }
  ],
});


let conversationModel = mongoose.model('conversation', userSchema);
export default conversationModel;