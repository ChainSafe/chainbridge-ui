
FROM node:14-alpine AS builder
RUN apk --no-cache add git
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN ls -al
RUN ls -al ./packages/config-server
RUN yarn build:server


ARG AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ARG AWS_SESSION_TOKEN
ENV AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN


FROM node:14-alpine
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/ ./packages

EXPOSE 8000

CMD [ "yarn", "start:config-server"]