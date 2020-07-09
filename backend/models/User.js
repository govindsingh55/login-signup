const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  timestamps: {
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
  }
});

module.exports = mongoose.model('User', UserSchema);