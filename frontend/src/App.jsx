import React, { useState } from 'react'

const n3Vocabulary = [
  { id: 1, word: '影響する', reading: 'えいきょうする', meaning: '影響', example: '環境に影響を与える。 (對環境造成影響。)' },
  { id: 2, word: '緊張する', reading: 'きんちょうする', meaning: '緊張', example: '面接の前で緊張している。 (面試前很緊張。)' },
  { id: 3, word: '複雑な', reading: 'ふくざつな', meaning: '複雜的', example: 'この問題は非常に複雑だ。 (這個問題非常複雜。)' },
  { id: 4, word: '集中する', reading: 'しゅうちゅうする', meaning: '專注、集中', example: '勉強に集中する。 (專心讀書。)' },
  { id: 5, word: '選択する', reading: 'せんたくする', meaning: '選擇', example: '自分の道を選択する。 (選擇自己的路。)' }
]

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentWord = n3Vocabulary[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % n3Vocabulary.length)
    }, 150)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + n3Vocabulary.length) % n3Vocabulary.length)
    }, 150)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-slate-800 p-4">
      <div className="w-full max-w-md">
        {/* 頂部進度 */}
        <div className="flex justify-between items-center mb-6">
          <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full shadow-sm">
            JLPT N3 核心單字
          </span>
          <span className="text-sm text-slate-500 font-medium">
            {currentIndex + 1} / {n3Vocabulary.length}
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