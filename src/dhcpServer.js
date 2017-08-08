//const dhcp = require('dhcp');
const dhcp = require('../../../nodejs/node-dhcp'); // for local dev
const config = require('./config.json');


const createDhcpServer = () => {
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
  server.listen();

  return server;
};

module.exports = createDhcpServer;