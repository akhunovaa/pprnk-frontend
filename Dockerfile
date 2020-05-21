FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d
COPY build/ /usr/share/nginx/html/
