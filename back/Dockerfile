ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /var/app
WORKDIR /var/app
COPY . /var/app
RUN yarn --frozen-lockfile
CMD ["yarn", "start"]
EXPOSE 3000
