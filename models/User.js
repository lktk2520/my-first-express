const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // 確保帳號不重複
    min: 6
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 2. 建立 Model
// 'User' 會對應到資料庫裡的 'users' 集合 (Collection)
const User = mongoose.model('User', UserSchema);

module.exports = User;