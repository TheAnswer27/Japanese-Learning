FROM nginx:alpine

# 複製網頁
COPY index.html /usr/share/nginx/html/index.html

# 把 Nginx 的暫存與記錄檔路徑指向 /tmp，避免權限不足
RUN sed -i 's|/var/cache/nginx|/tmp/cache|g' /etc/nginx/nginx.conf \
    && sed -i 's|/var/run/nginx.pid|/tmp/nginx.pid|g' /etc/nginx/nginx.conf \
    && sed -i 's|/var/log/nginx|/tmp/log|g' /etc/nginx/nginx.conf

EXPOSE 80