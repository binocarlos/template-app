FROM mhart/alpine-node:11.12 AS build-env
LABEL maintainer="kai@kaidam.ltd"

RUN apk update
RUN apk upgrade
RUN apk add bash git

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install
COPY . /app

ARG productionMode
RUN if [ -n "$productionMode" ]; then yarn run build; fi

ENTRYPOINT ["yarn", "run", "develop"]

FROM nginx:alpine
LABEL maintainer="kai@kaidam.ltd"
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-env /app/dist /www
COPY --from=build-env /app/meta.json /www