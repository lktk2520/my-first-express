const mongoose = require('mongoose');

const openTimeSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        // 使用 enum 限制只能輸入這幾個值，避免拼字錯誤
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    start: {
        type: String,
        default: "" // 允許空字串
    },
    end: {
        type: String,
        default: ""
    }
}, { _id: false }); // _id: false 表示這個子物件不需要自動產生獨立 ID

// 2. 定義主要資料結構
const LearnSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
        unique: true // 假設 index 是唯一的 ID
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    address: {
        type: String
    },
    // 這裡引用上面的子結構，代表它是一個陣列
    openTime: [openTimeSchema],
    county: {
        type: String
    },
    area: {
        type: String
    },
    note: {
        type: String,
        default: ""
    },
    delete: {
        type: Boolean,
        default: false // 預設為未刪除
    }
}, {
    timestamps: true, // 自動建立 createdAt 和 updatedAt 時間戳記
    versionKey: false // 隱藏 __v 欄位 (可選)
});

// 3. 建立 Model
// 'Learn' 會對應到資料庫裡的 'Learn' 集合 (Collection)
const Learn = mongoose.model('learns', LearnSchema);

module.exports = Learn;