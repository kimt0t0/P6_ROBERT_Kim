"use strict";

// Ecriture serveur et appel à l'app
var http = require('http');

var app = require('./app');

app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
server.listen(process.env.port || 3000);
//# sourceMappingURL=server.dev.js.map
