FROM node:21-bullseye-slim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install
ENTRYPOINT ["./entrypoint.sh"]
