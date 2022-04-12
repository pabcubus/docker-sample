FROM node:17
EXPOSE 3000
RUN mkdir -p /home/app
COPY . /home/app
WORKDIR /home/app
CMD ["sh","-c","npm i && npm start"]