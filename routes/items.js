//玩樂、運動、學習管理的API
const express = require('express');
const router = express.Router();


const Learn = require('../models/learn');

router.post('/learn/batch', async (req, res) => {
    try {
        // 1. 檢查傳進來的是不是陣列
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: "請傳入陣列格式" });
        }

        // 2. 使用 insertMany 一次寫入多筆
        // 這會自動驗證每一筆資料，如果有某一筆格式錯誤，預設會全部失敗
        const result = await Learn.insertMany(req.body);

        res.status(201).json({
            message: `成功新增 ${result.length} 筆資料`,
            data: result
        });

    } catch (error) {
        // 3. 錯誤處理
        // 如果其中有一筆資料 index 重複 (因為你有設 unique: true)，會在這裡報錯
        res.status(400).json({
            error: "批次新增失敗",
            details: error.message
        });
    }
});

router.get('/learn', async (req, res) => {
    try {
        // Find 裡面放空物件 {}，代表「沒有條件」，也就是「搜尋全部」
        const allData = await Learn.find({});

        res.status(200).json({
            message: '取得全部資料成功',
            count: allData.length, // 順便回傳筆數，讓你前端好確認有沒有漏
            data: allData
        });
    } catch (error) {
        // 查詢失敗通常是伺服器問題，所以用 500
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; // 記得匯出！