"use strict";

/* *** ECRITURE DU SERVEUR ET APPEL DE L'APP *** */

/* VARIABLES */
// Importation de http et de l'app
var http = require('http');

var app = require('./app');

var dotenv = require('dotenv').config(); // nécessaire pour faire fonctionner serveur node, doc ici: https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/

/* FONCTIONS */
// Obtention d'un port valide:


var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}; // Gestion des erreurs:


var errorHandler = function errorHandler(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var address = server.address();
  var bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;

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


var port = normalizePort(process.env.PORT || '3000'); // Démarrage appli:

app.set('port', port); // Création serveur:

var server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', function () {
  var address = server.address();
  var bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
server.listen(port);
//# sourceMappingURL=server.dev.js.map
