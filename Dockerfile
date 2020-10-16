
FROM registry.cn-hangzhou.aliyuncs.com/skylark/saler-nginx:1.18.0-alpine
WORKDIR /usr/share/nginx/html/
COPY ./dist/ ./laixi
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 10777