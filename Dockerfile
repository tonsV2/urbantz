FROM node:14.10.1-alpine3.11
WORKDIR /src
COPY . .
RUN npm install
USER guest
CMD ["node", "server.js"]