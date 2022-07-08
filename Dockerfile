
FROM node:14-alpine AS builder
RUN apk --no-cache add git
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN ls -al
RUN yarn build:core
RUN ls -al ./packages/core

ARG CONFIG_SERVER_HOST
ARG CONFIG_SERVER_PORT

RUN sh create-env-file.sh REACT_APP_CONFIG_SERVER_HOST=$CONFIG_SERVER_HOST REACT_APP_CONFIG_SERVER_PORT=$CONFIG_SERVER_PORT
CMD ["cat", "./packages/exmaple/.env"]

RUN yarn build:ui

# If you want to debug the .env file, uncomment the following line
# CMD ["cat", ".env"]

FROM nginx:1.19-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/packages/example/build /usr/share/nginx/html
EXPOSE 80
