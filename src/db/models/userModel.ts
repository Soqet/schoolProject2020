import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

let userSchema = new mongoose.Schema({
  _id: ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String, 
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String, 
    required: true
  },
});


let userModel = mongoose.model('user', userSchema);
export default userModel;