const express = require('express');
const router = express.Router(); // 建立一個路由實例

// 引入剛剛拆出去的 middleware
const checkAuth = require('../middlewares/auth');

// 注意！這裡的路徑只要寫 '/' 就好
// 因為我們會在 index.js 設定它對應到 '/api/vip'
// 所以這裡的 '/' 其實就是 '/api/vip/'
router.get('/', checkAuth, (req, res) => {
  res.json({
    message: '這是有錢人才看得到的秘密資料',
    yourData: req.user
  });
});

// 你可以在這裡加更多跟 vip 有關的 API
// router.get('/detail', ...);

module.exports = router; // 匯出這個迷你 App