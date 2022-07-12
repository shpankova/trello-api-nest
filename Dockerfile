FROM node:16.10

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start:dev"]
