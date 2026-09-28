# 使用輕量級的 Nginx 映像檔（符合我們前面聊的 lightweight image）
FROM nginx:alpine

# 把我們的 index.html 複製到 Nginx 預設的網頁根目錄
COPY index.html /usr/share/nginx/html/index.html

# 暴露 80 連接埠
EXPOSE 80