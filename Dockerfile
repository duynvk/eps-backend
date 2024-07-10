FROM node:18-alpine

WORKDIR /duynvk/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

# docker build  --tag node-docker .
# docker run -p 5000:5000 -d node-docker