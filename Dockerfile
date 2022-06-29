#FROM node:14-alpine AS build
#RUN npm i -g npm@latest
#
#WORKDIR /build
#COPY package*.json ./
#RUN npm i
#
#COPY .browserslistrc .eslintignore .eslintrc.js \
#  babel.config.js jest.config.js stylelint.config.js \
#  tsconfig*.json ./
#COPY config config
#COPY public public
#COPY src src
#
##RUN npm run lint
##RUN npm test
#RUN npm run build

FROM nginx:1.22
ARG PACKAGE=dist
COPY $PACKAGE /usr/share/nginx/html
COPY config/nginx/default.conf /etc/nginx/conf.d
COPY config/nginx/40-index-env.sh /docker-entrypoint.d
