/* *** ECRITURE DU SERVEUR ET APPEL DE L'APP *** */

/* VARIABLES */

// Importation de http et de l'app
const http = require('http');
const app = require('./app');
const dotenv = require('dotenv').config(); // nécessaire pour faire fonctionner serveur node, doc ici: https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/


/* FONCTIONS */

// Obtention d'un port valide:
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

// Gestion des erreurs:
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
// Obtention du port:
const port = normalizePort(process.env.PORT || '3000');
// Démarrage appli:
app.set('port', port);
// Création serveur:
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);