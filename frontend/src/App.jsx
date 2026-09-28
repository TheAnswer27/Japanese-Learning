import React, { useState, useEffect } from 'react'
import { fetchVocabularies } from './services/vocabService'

export default function App() {
  const [vocabList, setVocabList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  // 當元件載入時，從後端 API 取得 MySQL 資料庫中的單字
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchVocabularies()
        setVocabList(data)
      } catch (err) {
        setError('無法載入單字資料，請確認後端或 MySQL 是否正常運作。')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-slate-600 bg-slate-100 text-lg">載入中...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 bg-slate-100 text-lg">{error}</div>
  }

  if (vocabList.length === 0) {
    return <div className="flex justify-center items-center h-screen text-slate-600 bg-slate-100 text-lg">資料庫目前沒有單字資料</div>
  }

  const currentWord = vocabList[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % vocabList.length)
    }, 150)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + vocabList.length) % vocabList.length)
    }, 150)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-slate-800 p-4">
      <div className="w-full max-w-md">
        {/* 頂部進度 */}
        <div className="flex justify-between items-center mb-6">
          <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full shadow-sm">
            JLPT N3 核心單字 (MySQL 聯動)
          </span>
          <span className="text-sm text-slate-500 font-medium">
            {currentIndex + 1} / {vocabList.length}
          </span>
        </div>

        {/* 3D 卡片外框 (設定 perspective 視角深度) */}
        <div 
          className="relative h-72 w-full cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* 翻轉主體 */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl shadow-xl transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* 正面 */}
            <div 
              className="absolute inset-0 w-full h-full bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between shadow-md"
              style={{ 
                backfaceVisibility: 'hidden', 
                WebkitBackfaceVisibility: 'hidden' 
              }}
            >
              <div className="text-right">
                <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">點擊翻面 🔄</span>
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-slate-800 mb-2 tracking-wide">
                  {currentWord.word}
                </h2>
                <p className="text-slate-400 text-sm">({currentWord.reading})</p>
              </div>
              <div className="text-center">
                <span className="text-xs text-indigo-500 font-medium">正面：日語單字</span>
              </div>
            </div>

            {/* 背面 */}
            <div 
              className="absolute inset-0 w-full h-full bg-indigo-900 text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl"
              style={{ 
                backfaceVisibility: 'hidden', 
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="text-right">
                <span className="text-xs text-indigo-200 bg-indigo-800/60 px-2 py-1 rounded-md">點擊翻回 🔄</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-indigo-300 uppercase tracking-wider mb-1">中文意思</p>
                <h3 className="text-3xl font-bold text-white mb-3">
                  {currentWord.meaning}
                </h3>
                <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-700/50 text-left">
                  <p className="text-xs text-indigo-300 mb-1">例句：</p>
                  <p className="text-sm text-indigo-100">{currentWord.example}</p>
                </div>
              </div>
              <div className="text-center">
                <span className="text-xs text-indigo-300">背面：釋義與例句</span>
              </div>
            </div>
          </div>
        </div>

        {/* 控制按鈕 */}
        <div className="flex gap-4 mt-8">
          <button 
            onClick={handlePrev}
            className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition shadow-sm active:scale-95"
          >
            ⬅️ 上一個
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-md shadow-indigo-100 active:scale-95"
          >
            下一個 ➡️
          </button>
        </div>
      </div>
    </div>
  )
}