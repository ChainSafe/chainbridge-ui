FROM node:14-alpine AS builder
RUN apk --no-cache add git
WORKDIR /app
RUN ls -al
COPY package.json ./
# COPY ./packages/example/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./packages/example/* .
RUN ls -al
RUN cd ./packages/example && yarn build

FROM nginx:1.19-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html
