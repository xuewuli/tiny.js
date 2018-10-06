/* eslint no-console: 0 */

const express = require('express');
const tiny = require('../packages/tiny');
const send = require('../packages/send');
const api = require('./assets/github-api');

const expApp = express();

function onError(err, req, res) {
  console.log(err);
  res.end('error');
}

const app = tiny({ onError, port: 3001 });

const handler = (req, res, next) => {
  res.end(`handler, ${req.params.alias}`);
};

const handlerA = (req, res, next) => {
  res.end(`handlerA, ${req.params.alias}`);
};
const handlerID = (req, res, next) => {
  res.end(`handlerID, ${req.params.alias}`);
};

const handlerIDID = (req, res, next) => {
  res.end(`handlerIDID, ${req.params.alias}`);
};

// api.forEach((val) => {
//   app[val[0].toLowerCase()](val[1], handler);
// });

app
  .use(send)
  .get('/test', handler)
  .use('/test', handlerA)
  .get('/test/:hello', handler)
  .get('/users/:group/', handlerID)
  .get('/users/:group/:id', handlerIDID);

app.use();

let params = {};
console.log(app.match('GET', '/users/', params));
console.log(JSON.stringify(params));
params = {};
console.log(app.match('GET', '/users/1', params));
console.log(JSON.stringify(params));
params = {};
console.log(app.match('GET', '/users/1/2', params));
console.log(JSON.stringify(params));
params = {};
console.log(app.match('GET', '/test', params));
console.log(JSON.stringify(params));
params = {};
console.log(app.match('GET', '/test/', params));
console.log(JSON.stringify(params));
params = {};
console.log(app.match('GET', '/test/123', params));
console.log(JSON.stringify(params));
params = {};

// app.run((address) => {
//     console.log(address);
//   });
