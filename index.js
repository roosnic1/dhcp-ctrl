const dhcp = require('dhcp');
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

server.on('message', function (data) {
  console.log(data);
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

process.on('SIGINT', () => {
    server.close();
});