// 定義後端 API 的基礎網址（開發環境對應本地端 3000 埠）
// 使用 Vite 環境變數，如果沒有則預設為你的 CRC 測試網址
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://japanese-backend-service-japanese-learning.apps-crc.testing/api';

/**
 * 取得所有 N3 單字資料
 */
export const fetchVocabularies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/vocabulary`);
    if (!response.ok) {
      throw new Error('網路回應錯誤或伺服器異常');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('取得單字失敗:', error);
    throw error;
  }
};