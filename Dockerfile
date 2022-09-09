# syntax=docker/dockerfile:1
FROM node:16.17.0-alpine
MAINTAINER Wilmar Ibarguen <wilmar.ibg@gmail.com>
COPY ./code /code
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
WORKDIR /code
EXPOSE 3003