// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // 記得：路徑變了，要多一層 '../'

// 1. 註冊 API
//原本是 app.post('/api/register')，這裡只要寫 '/register'
// 因為我們會在 index.js 設定大路徑 '/api'
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: '註冊成功', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. 取得所有使用者 API
// 原本是 app.get('/api/users')，這裡只要寫 '/users'
// 或者你想做得更漂亮，可以改成 '/'，然後在 index 掛載到 '/api/users' (看個人習慣，這裡先教第一種)
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router; // 記得匯出！