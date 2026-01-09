// 這裡只有單純的檢查邏輯
const checkAuth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token === 'secret-password') {
    req.user = { name: 'Frontend Master', level: 99 };
    next();
  } else {
    res.status(401).json({ error: '權限不足，請滾' });
  }
};

module.exports = checkAuth; // 匯出給別人用