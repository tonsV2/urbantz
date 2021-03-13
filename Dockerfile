FROM node:14.10.1-alpine3.11
WORKDIR /src
COPY . .
RUN npm ci && npm ls
USER guest
CMD ["node", "app.js"]
