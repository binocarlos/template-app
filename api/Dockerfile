FROM mhart/alpine-node:11.12
LABEL maintainer="kai@kaidam.ltd"
RUN apk update
RUN apk upgrade
RUN apk add bash curl

# install kubectl
RUN curl -L -o kubectl https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
  && \
  chmod +x ./kubectl && \
  mv ./kubectl /usr/local/bin/kubectl

WORKDIR /app

# install api node_modules
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN yarn install

# copy files
COPY . /app

ENTRYPOINT ["yarn", "run", "serve"]