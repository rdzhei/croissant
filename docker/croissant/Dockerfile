FROM node:16.20.2-alpine as builder

RUN apk update

WORKDIR /app

COPY dist /app/dist

FROM nginx:latest

COPY --from=builder /app/dist /app/dist

WORKDIR /app/dist

CMD ["nginx", "-g", "daemon off;"]
