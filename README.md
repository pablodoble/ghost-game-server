# ghost-game-server
This repo contains the server side application (REST API) for the Ghost Game project. 
For the sake of simplicity and focusing on the client side, this application uses a simple express server and it's prepared for keeping a single game in memory. It means we can just play 1 game at time.

This application must be running to make the client work.

## Prerequisites
- Install nodejs downloading the installer from https://nodejs.org/es/
- Install nodemon globally: npm i nodemon -g (for some reason, it cannot be run as a local dependency)

## Init
```
npm install
npm start
```

## Agreement
- User identification: a boolean variable will identify the user
    - true: client user
    - false: machine
    - null: none of them (used to mean that no one have won, for example)

REST API will be listening for requests on http://localhost:3000