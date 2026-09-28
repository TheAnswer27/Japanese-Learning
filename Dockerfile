FROM nginx:alpine

# 直接把你的網頁覆蓋過去即可
COPY index.html /usr/share/nginx/html/index.html