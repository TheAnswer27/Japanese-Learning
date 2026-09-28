FROM node:20-alpine

# 設定工作目錄
WORKDIR /app

# 複製相依性描述檔
COPY package*.json ./

# 安裝生產環境依賴
RUN npm ci --only=production

# 複製其餘程式碼
COPY . .

# 開放後端連接埠
EXPOSE 3000

# 啟動伺服器
CMD ["node", "src/server.js"]