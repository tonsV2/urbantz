FROM node:14.10.1-alpine3.11
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci && npm ls
COPY . .
USER guest
CMD ["node", "app.js"]
