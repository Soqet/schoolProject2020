import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

let tokenSchema = new mongoose.Schema({
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


let tokenModel = mongoose.model('token', tokenSchema);
export default tokenModel;