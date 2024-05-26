const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: 
  { type: String, 
    required: true, 
    unique: true 
  },
  email: 
  { type: String, 
    required: true, 
    unique: true 
  },
  password: 
  { type: String, 
    required: true 
  },
  role: 
  { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  following: [{
    type: String
  }],
  notifications:[{
    type:String
  }],
  disabled: {
    type:Boolean
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;