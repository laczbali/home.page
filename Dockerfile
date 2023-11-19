# Env setup
FROM node:18
WORKDIR /app

ENV PORT=80
EXPOSE 80

# Install app dependencies
COPY package.*json ./
RUN npm install

# Run the app
COPY src ./src
CMD npm run start
