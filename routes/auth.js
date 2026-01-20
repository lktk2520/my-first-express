const express = require('express');
const router = express.Router();
const User = require('./models/User'); // 引入剛剛建立的 Model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. 註冊 (Register) ---
router.post('/register', async (req, res) => {
    try {
        // 檢查使用者是否已經存在
        const emailExist = await User.findOne({ username: req.body.username });
        if (emailExist) return res.status(400).send('Username already exists');

        // [重點] 密碼加密
        // salt 是一個隨機生成的數據，用來混淆密碼，讓 hash 更難被破解
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // 建立新使用者物件
        const user = new User({
            username: req.body.username,
            password: hashedPassword // 存入加密後的密碼，絕不要存 req.body.password
        });

        // 存入 MongoDB
        const savedUser = await user.save();
        res.send({ user: savedUser._id, message: "註冊成功！" });

    } catch (err) {
        res.status(400).send(err);
    }
});

// --- 2. 登入 (Login) ---
router.post('/login', async (req, res) => {
    try {
        // 檢查帳號是否存在
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('帳號或密碼錯誤');

        // [重點] 驗證密碼
        // bcrypt.compare 會自動將使用者輸入的明碼與資料庫的 Hash 做比對
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('帳號或密碼錯誤');

        // 登入成功，發送 Token (JWT)
        // 這樣前端拿到 Token 後，下次請求帶上這個 Token，後端就知道他是誰了
        const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY'); // 'YOUR_SECRET_KEY' 之後建議放在環境變數 .env

        // 將 Token 回傳給前端 (通常放在 header 或 body)
        res.header('auth-token', token).send({ token: token, message: "登入成功！" });

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;