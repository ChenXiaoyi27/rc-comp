# dokcerfile
# build stage
FROM node:lts-alpine as build-stage
# 将工作区设为app与其他系统文件隔离
WORKDIR /app
COPY package*.json ./
# RUN npm config set registry https://registry.npm.taobao.org/
# RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build

# production stage 
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 容器对外暴露端口号
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
