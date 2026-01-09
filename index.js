// index.js (最上方)
require('dotenv').config(); // [新增] 這行要放最上面！
const mongoose = require('mongoose'); // 引入 mongoose
const express = require('express');
const vipRouter = require('./routes/vip'); //引入路由模組
const userRouter = require('./routes/users');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000; // [修改] 改讀變數

// [修改] 資料庫連線改讀環境變數
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ 雲端 MongoDB 連線成功！'))
  .catch(err => console.error('❌ 連線失敗:', err));


app.get('/', (req, res) => {
  res.send('這是首頁，不用驗證也能看');
});

// 1. VIP 相關的都去這裡找 (網址開頭是 /api/vip)
app.use('/api/vip', vipRouter);

// 2. 一般使用者相關(註冊、查詢)都去這裡找 (網址開頭是 /api)
// 注意：因為我們在 users.js 裡是寫 '/register' 和 '/users'
// 所以這裡掛在 '/api' 下面即可
// 組合起來變成： /api + /register = /api/register
app.use('/api', userRouter);

// ... (原本的 app.listen 不用動) ...
app.listen(PORT, () => {
  console.log(`伺服器運作中: http://localhost:${PORT}`);
});