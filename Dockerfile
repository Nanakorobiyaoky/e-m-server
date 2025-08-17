FROM node:20-alpine AS development

COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

WORKDIR /usr/src/app

COPY . .
