    FROM node:alpine
    WORKDIR /usr/test-task-shortner
    COPY package.json .
    RUN npm install && npm install typescript -g
    COPY . .
