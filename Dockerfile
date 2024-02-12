FROM node:18.16.0-alpine3.17
RUN wget -O dockerize.tar.gz https://github.com/jwilder/dockerize/releases/download/v0.7.0/dockerize-alpine-linux-amd64-v0.7.0.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize.tar.gz \
    && rm dockerize.tar.gz
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install
ENTRYPOINT ["./entrypoint.sh"]
