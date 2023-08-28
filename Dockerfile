# node版本号
FROM node:16.17.0
# 工作目录
WORKDIR /rc-comp
# 添加所有文件到create-react-app目录
ADD . /rc-comp
# 执行命令
RUN npm install && npm run build && npm install -g http-server
# 暴露端口号
EXPOSE 3000
# 容器启动之后, 执行http-server 注：./build是指打包后的文件
CMD http-server ./dist -p 3000
