// 定義後端 API 的基礎網址（開發環境對應本地端 3000 埠）
const API_BASE_URL = 'http://localhost:3000/api';

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