const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// 中介軟體 (Middleware)
app.use(cors());
app.use(express.json());

// 1. 健康檢查 API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'N3 Backend is running successfully!' });
});

// 2. 取得所有 N3 單字的 API
app.get('/api/vocabulary', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vocabularies');
    res.json(rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: '無法取得單字資料庫內容。' });
  }
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});