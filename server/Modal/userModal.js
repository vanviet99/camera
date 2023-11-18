const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Camera')


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  phone: {
    type: String
  },
  money: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  role: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true
  },
  refreshToken:{
    type:String,
    default:null
  },
  code:{
    type:String,
    default:null
  }

}, { collection: 'user' });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
