# ---- 階段一：建置前端靜態檔案 (升級至 Node 20) ----
FROM node:20-alpine AS builder

WORKDIR /app

# 複製 package 檔案並安裝相依套件
COPY package*.json ./
RUN npm install

# 複製所有原始碼並進行打包
COPY . .
RUN npm run build

# ---- 階段二：使用 Nginx 託管產物 ----
FROM nginx:alpine

# 從上一階段的 builder 裡面把編譯好的 dist 複製到 Nginx 的預設公開目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 開放 80 連接埠
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]