FROM node:23-bullseye-slim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
# Fix line endings and make script executable
RUN sed -i 's/\r$//' ./entrypoint.sh && \
    chmod +x ./entrypoint.sh

RUN npm install
ENTRYPOINT ["./entrypoint.sh"]
