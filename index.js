//const dhcp = require('dhcp');
const dhcp = require('../../nodejs/node-dhcp'); // for local dev
const express = require('express');
const config = require('./config.json');

const ENV = process.env.NODE_ENV;


const server = dhcp.createServer({
    server: config.SERVER,
    range: [
        config.RANGE_FROM, 
        config.RANGE_TO
    ],
    static: config.STATIC,
    netmask: config.NETMASK,
    router: [
        config.ROUTER01
    ]
});

server.on('bound', function(state) {
  console.log("BOUND:");
  console.log(state);
});

server.on("error", function (err, data) {
  console.log(err, data);
});

server.on("listening", function (sock) {
  var address = sock.address();
  console.info('Server Listening: ' + address.address + ':' + address.port);
});

console.log('Starting Server');
server.listen(ENV === 'dev' ? 5555 : undefined);


// Express
var app = express();

app.get('/', (req, res) => {
    const response = {
        name: 'DHCP state',
        data: server.getState()
    }
    res.json(response);
});

app.listen(process.env.PORT || 8080);


process.on('SIGINT', () => {
    if (server) {
        server.close();
    }
});