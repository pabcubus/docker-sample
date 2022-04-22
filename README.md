# docker-sample

## What this is ?
This is a [Docker](https://www.docker.com/) sample project, just to demonstrate how to create an easy node app with Express, MongoDB and deploy it in a Docker container.

## What do you need to run it
* [NodeJS](https://nodejs.org/es/)
* [Docker](https://www.docker.com/)
* [GIT](https://git-scm.com/)

## How can you run it
First, go to your terminal or CMD and do this:
```sh
$ git clone https://github.com/pabcubus/docker-sample.git docker-sample
$ cd docker-sample
$ npm i
$ npm run docker:compose     // This is to install docker container (mongoDB)
```
Then, if you want to run in dev mode locally
```sh
$ npm run dev
```
If you want to install a Node image just to run the project in a container
```sh
$ npm run docker:start
```

After that:
* The sample webpage should be working now in http://localhost:3000.
* The users and orders endpoints have POST and GET methods on http://localhost:3000/users and http://localhost:3000/orders.

Go to your browser and do http://localhost:3000/ and you can see the "Hello World" page
