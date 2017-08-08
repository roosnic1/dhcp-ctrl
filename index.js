const express = require('express');

const createDhcpServer = require('./src/dhcpServer');

const ENV = process.env.NODE_ENV;

const mockData = [
  {
    address: "192.168.1.142",
    leasePeriod: 86400,
    server: "192.168.1.5",
    state: "BOUND",
    bindTime: "2017-08-08T16:37:13.303Z",
    mac: "48-4B-AA-54-F8-76"
  },{
    address: "192.168.1.143",
    leasePeriod: 86400,
    server: "192.168.1.5",
    state: "BOUND",
    bindTime: "2017-08-08T16:37:13.303Z",
    mac: "48-4B-AA-54-F8-36"
  },{
    address: "192.168.1.144",
    leasePeriod: 86400,
    server: "192.168.1.5",
    state: "BOUND",
    bindTime: "2017-08-08T16:37:13.303Z",
    mac: "48-4B-A4-54-F8-36"
  },{
    address: "192.168.1.145",
    leasePeriod: 86400,
    server: "192.168.1.5",
    state: "BOUND",
    bindTime: "2017-08-08T16:37:13.303Z",
    mac: "48-4B-A4-54-F8-26"
  }
];


const server = ENV === 'dev' ? { getState() { return mockData }} : createDhcpServer();

// Express
const app = express();

app.get('/v1/api/state', (req, res) => {
  const dhcpSate = server.getState();
  const states = [];
  for (let key in dhcpSate) {
    if (dhcpSate.hasOwnProperty(key)) {
      dhcpSate[key].mac = key;
      states.push(dhcpSate[key]);
    }
  }
  res.json(states);
});

app.listen(process.env.PORT || 3001);


process.on('SIGINT', () => {
    if (server) {
        server.close();
    }
});