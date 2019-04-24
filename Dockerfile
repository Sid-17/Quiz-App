FROM nginx:1.15
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY /dist/quizapp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ .
