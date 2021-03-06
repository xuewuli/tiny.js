// Incomplete but sufficient mock
class Response {
  constructor() {
    this.body = '';
    this.headers = {};
    this.statusCode = 200;
  }

  end(str) {
    this.body = str;
  }

  writeHead(int, obj) {
    this.statusCode = int;
    this.headers = { ...this.headers, ...obj };
  }

  getHeaders() {
    return this.headers;
  }

  getHeaderNames() {
    return Object.keys(this.headers);
  }

  getHeader(key) {
    return this.headers[key.toLowerCase()];
  }

  hasHeader(key) {
    return this.headers[key.toLowerCase()] !== void 0;
  }
}

exports.Response = Response;
