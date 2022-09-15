# syntax=docker/dockerfile:1
FROM node:16.17.0-alpine
MAINTAINER Wilmar Ibarguen <wilmar.ibg@gmail.com>
COPY ./code /code
COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh 
ENTRYPOINT ["/docker-entrypoint.sh"]
WORKDIR /code
RUN npm install -g npm@8.19.1
RUN npm install -g sass@1.54.9
RUN npm install -g @vue/cli@5.0.8
RUN vue --version
EXPOSE 3003