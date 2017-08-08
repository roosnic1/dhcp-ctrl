const express = require('express');

const createDhcpServer = require('./src/dhcpServer');

const ENV = process.env.NODE_ENV;


const server = ENV === 'dev' ? { getState() { return [] }} : createDhcpServer();

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