/* *** SERVER *** */

/* VARIABLES */

//Import http, app and dotenv
const http = require('http');
const app = require('./app');
const dotenv = require('dotenv').config(); 
//node server doesn't work without dotenv, see doc here: https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/


/* FONCTIONS */

//To get a valid port:
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//Errors handling:
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/* ACTIONS */
//Get port:
const port = normalizePort(process.env.PORT || '3000');

//Start app:
app.set('port', port);

//Create server and turn on:
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

//Listen to port:
server.listen(port);