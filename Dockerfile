# baic setup
FROM node:18
WORKDIR /app

EXPOSE 80
EXPOSE 443

CMD npm run start

# ssl setup
RUN apt update
RUN apt install certbot -y

# Install app dependencies
COPY package.*json ./
RUN npm install

# Copy app code
COPY src ./src
