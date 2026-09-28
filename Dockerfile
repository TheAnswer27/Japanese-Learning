FROM nginx:alpine

# 1. 複製你的網頁
COPY index.html /usr/share/nginx/html/index.html

# 2. 修改 Nginx 相關資料夾的權限，讓非 root 使用者也能讀寫
RUN chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /etc/nginx \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid

# 3. （選配）如果你不需要讓它監聽 80 以外的特權埠，可以維持 80
EXPOSE 80