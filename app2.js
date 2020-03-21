//refer to nodeServer.js for more basics
const http = require('http');
const routes = require('./routes')

console.log(routes['someText'])

//execute function stored in routes for incoming requests
const server = http.createServer(routes['handler'])

server.listen(3000);

