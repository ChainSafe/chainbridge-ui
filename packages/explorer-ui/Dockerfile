
FROM node:14-alpine AS builder
RUN apk --no-cache add git
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN ls -al
RUN yarn build:core
RUN ls -al ./packages/core
RUN yarn build:explorer

FROM nginx:1.19-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/packages/explorer-ui/build /usr/share/nginx/html
