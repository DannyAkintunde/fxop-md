FROM node:lts-buster

RUN apt-get update && \
apt-get install -y \
ffmpeg \
imagemagick \
webp && \
apt-get upgrade -y && \
npm i pm2 -g && \
rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/FXastro/fxop-md /root/bot
WORKDIR /root/bot/


COPY package.json .
RUN npm install pm2 -g
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
