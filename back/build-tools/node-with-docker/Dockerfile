ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine

#docker: Installs docker
#py-pip: Installs pip
RUN apk add --no-cache docker py-pip

#Installs docker-compose
RUN pip install docker-compose
