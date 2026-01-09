const mongoose = require('mongoose');

// 1. 定義 Schema (類似 TypeScript Interface)
// 這裡限制了資料庫只能存什麼欄位
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // 必填
    unique: true    // 不可重複
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: String,
    default: 'Normal' // 預設值
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 2. 建立 Model
// 'User' 會對應到資料庫裡的 'users' 集合 (Collection)
const User = mongoose.model('User', userSchema);

module.exports = User;