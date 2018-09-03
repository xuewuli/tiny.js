const { STATUS_CODES } = require('http');
const { createServer } = require('http');
const { parse } = require('querystring');
const parseurl = require('./parseurl');
const Router = require('./router');

function onError(err, req, res) {
  const code = (res.statusCode = err.code || err.status || 500);
  res.end((err.length && err) || err.message || STATUS_CODES[code]);
}

class Tiny extends Router {
  constructor(options) {
    super();
    ({
      host: this.host,
      port: this.port,
      onError: this.onError = onError,
      notFound: this.notFound = onError.bind(null, { code: 404 }),
      server: this.server = null
    } = options);
    this.dispatch = this.dispatch.bind(this);
  }

  run(callback = function cb() {}) {
    this.server = this.server || createServer();
    this.server.listen(this.port, this.host);
    this.server.on('request', this.dispatch);
    this.server.once('listening', () => {
      this.use();
      const address = this.server.address();
      callback(address);
    });

    return this.server;
  }

  dispatch(req, res) {
    const parsedUrl = parseurl(req);
    const params = {};
    const route = this.match(req.method, parsedUrl.pathname, params);
    if (route.length === 0) {
      this.notFound(req, res);
      return;
    }

    req.params = params;
    req.pathname = parsedUrl.pathname;
    req.query = parse(parsedUrl.query);

    const h = route;
    const errFun = this.onError;
    let i = 1;
    const next = (err) => (err ? errFun(err, req, res, next) : h[i++](req, res, next));
    h[0](req, res, next);
  }
}

module.exports = (options = {}) => new Tiny(options);
