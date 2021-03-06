const http = require('http');
const axios = require('axios');
const { tape, sleep, listen } = require('./util');

const tiny = require('../packages/tiny');

const METHODS = [
  'all',
  'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  'TRACE'
];

tape('tiny', (t) => {
  t.is(typeof tiny, 'function', 'exports a function');
  t.end();
});

tape('tiny::internals', (t) => {
  const app = tiny();
  const proto = Object.getPrototypeOf(app);

  t.is(app.server, null, 'app.server is `null` initially (pre-listen)');
  listen(app);
  t.ok(app.server instanceof http.Server, '~> app.server becomes HTTP server (post-listen)');
  app.server.close();

  t.isFunction(app.onError, 'app.onError is a function');
  t.isFunction(app.notFound, 'app.notFound is a function');

  ['Router', 'route', 'mount', 'match', 'handler'].forEach((k) => {
    t.isFunction(app[k], `app.${k} is a function`);
  });

  ['filter', 'add', 'toString'].forEach((k) => {
    t.isFunction(proto[k], `app.${k} is a prototype method`);
  });

  t.isObject(app.routes, 'app.routes is an object tree');

  METHODS.forEach((k) => {
    t.isFunction(app[k.toLowerCase()], `app.${k.toLowerCase()} is a function`);
    if (k !== 'all') {
      t.isEmpty(app.routes[k], `~> routes[${k}] is empty`);
    }
  });

  t.end();
});

tape('tiny::usage::basic', (t) => {
  t.plan(3);

  const app = tiny();
  const arr = [
    ['GET', '/'],
    ['POST', '/users'],
    ['PUT', '/users/:id']
  ];

  arr.forEach(([m, p]) => {
    app.add(m, p, () => t.pass(`~> matched ${m}(${p}) route`));
  });

  app.build();

  const param = {};
  arr.forEach(([m, p]) => {
    app.match(m, p, param).forEach((fn) => {
      fn();
    });
  });
});

tape('tiny::usage::variadic', async (t) => {
  t.plan(20);

  function foo(req, res, next) {
    req.foo = req.foo || 0;
    req.foo += 250;
    next();
  }

  function bar(req, res, next) {
    req.bar = req.bar || '';
    req.bar += 'bar';
    next();
  }

  function onError(err, req, res) {
    t.pass('2nd "/err" handler threw error!');
    t.is(err, 'error', '~> receives the "error" message');
    t.is(req.foo, 500, '~> foo() ran twice');
    t.is(req.bar, 'bar', '~> bar() ran once');
    res.statusCode = 400;
    res.end('error');
  }

  const app = tiny({ onError })
    .filter(foo, bar)
    .get('/one', foo, bar, (req, res) => {
      t.pass('3rd "/one" handler');
      t.is(req.foo, 500, '~> foo() ran twice');
      t.is(req.bar, 'barbar', '~> bar() ran twice');
      res.end('one');
    })
    .get(
      '/two',
      foo,
      (req, res, next) => {
        t.pass('2nd "/two" handler');
        t.is(req.foo, 500, '~> foo() ran twice');
        t.is(req.bar, 'bar', '~> bar() ran once');
        req.hello = 'world';
        next();
      },
      (req, res) => {
        t.pass('3rd "/two" handler');
        t.is(req.hello, 'world', '~> preserves route handler order');
        t.is(req.foo, 500, '~> original `req` object all the way');
        res.end('two');
      }
    )
    .get(
      '/err',
      foo,
      (req, res, next) => {
        next('error');
      },
      (req, res) => {
        t.pass('SHOULD NOT RUN');
        res.end('wut');
      }
    );

  const uri = listen(app);
  t.pass(uri);

  let r = await axios.get(`${uri}/one`);
  t.is(r.status, 200, '~> received 200 status');
  t.is(r.data, 'one', '~> received "one" response');

  r = await axios.get(`${uri}/two`);
  t.is(r.status, 200, '~> received 200 status');
  t.is(r.data, 'two', '~> received "two" response');

  await axios.get(`${uri}/err`).catch((err) => {
    const resp = err.response;
    t.is(resp.status, 400, '~> received 400 status');
    t.is(resp.data, 'error', '~> received "error" response');
  });

  app.server.close();
});

tape('tiny::usage::middleware', async (t) => {
  t.plan(20);

  const app = tiny()
    .filter((req, res, next) => {
      req.one = 'hello';
      return next();
    })
    .filter('/', (req, res, next) => {
      req.two = 'world';
      next();
    })
    .filter('/about', (req, res, next) => {
      t.is(req.one, 'hello', '~> sub-mware [/about] runs after first global middleware');
      t.is(req.two, 'world', '~> sub-mware [/about] runs after second global middleware');
      next();
    })
    .filter('/subgroup', (req, res, next) => {
      req.subgroup = true;
      t.is(req.one, 'hello', '~> sub-mware [/subgroup] runs after first global middleware');
      t.is(req.two, 'world', '~> sub-mware [/subgroup] runs after second global middleware');
      next();
    })
    .get('/about', (req, res) => {
      res.end('About');
    })
    .post('/subgroup', (req, res) => {
      t.is(req.subgroup, true, '~~> POST /subgroup ran after its shared middleware');
      res.end('POST /subgroup');
    })
    .get('/subgroup/foo', (req, res) => {
      t.is(req.subgroup, true, '~~> GET /subgroup/foo ran after its shared middleware');
      res.end('GET /subgroup/foo');
    })
    .get('/', (req, res) => {
      t.pass('~> matches the GET(/) route');
      t.is(req.one, 'hello', '~> route handler runs after first middleware');
      t.is(req.two, 'world', '~> route handler runs after both middlewares!');
      res.setHeader('x-type', 'text/foo');
      res.end('Hello');
    });

  const uri = listen(app);

  let r = await axios.get(uri);
  t.is(r.status, 200, '~> received 200 status');
  t.is(r.data, 'Hello', '~> received "Hello" response');
  t.is(r.headers['x-type'], 'text/foo', '~> received custom header');

  r = await axios.get(`${uri}/about`);
  t.is(r.status, 200, '~> received 200 status');
  t.is(r.data, 'About', '~> received "About" response');

  r = await axios.post(`${uri}/subgroup`);
  t.is(r.status, 200, '~> received 200 status');
  t.is(r.data, 'POST /subgroup', '~> received "POST /subgroup" response');

  r = await axios.get(`${uri}/subgroup/foo`);
  t.is(r.status, 200, '~> received 200 status');
  t.is(r.data, 'GET /subgroup/foo', '~> received "GET /subgroup/foo" response');

  app.server.close();
});

tape('tiny::usage::middleware (async)', async (t) => {
  t.plan(6);

  const app = tiny()
    .filter((req, res, next) =>
      sleep(10)
        .then(() => {
          req.foo = 123;
        })
        .then(next)
    )
    .filter((req, res, next) =>
      sleep(1)
        .then(() => {
          req.bar = 456;
        })
        .then(next)
    )
    .get('/', (req, res) => {
      t.pass('~> matches the GET(/) route');
      t.is(req.foo, 123, '~> route handler runs after first middleware');
      t.is(req.bar, 456, '~> route handler runs after both middlewares!');
      res.setHeader('x-type', 'text/foo');
      res.end('Hello');
    });

  const uri = listen(app);

  const r = await axios.get(uri);
  t.is(r.status, 200, '~> received 200 status');
  t.is(r.data, 'Hello', '~> received "Hello" response');
  t.is(r.headers['x-type'], 'text/foo', '~> received custom header');

  app.server.close();
});

tape('tiny::usage::errors', async (t) => {
  t.plan(9);
  let a = 41;

  // next(Error)
  const foo = tiny()
    .filter((req, res, next) => {
      a += 1;
      return next(new Error('boo'));
    })
    .get('/', (req, res) => {
      a = 0; // wont run
      res.end('OK');
    });

  const u1 = listen(foo);

  await axios.get(u1).catch((err) => {
    const r = err.response;
    t.is(a, 42, 'exits before route handler if middleware error');
    t.is(r.data, 'boo', '~> received "boo" text');
    t.is(r.status, 500, '~> received 500 status');
    foo.server.close();
  });

  // next(string)
  const bar = tiny()
    .filter((_, r, next) => next('boo~!'))
    .get('/', (_, res) => {
      a = 123; // wont run
      res.end('OK');
    });

  const u2 = listen(bar);

  await axios.get(u2).catch((err) => {
    const r = err.response;
    t.is(a, 42, 'exits without running route handler');
    t.is(r.data, 'boo~!', '~> received "boo~!" text');
    t.is(r.status, 500, '~> received 500 status');
    bar.server.close();
  });

  // early res.end()
  const baz = tiny()
    .filter((_, res) => {
      res.statusCode = 501;
      return res.end('oh dear');
    })
    .get('/', (_, res) => {
      a = 42; // wont run
      return res.end('OK');
    });

  const u3 = listen(baz);

  await axios.get(u3).catch((err) => {
    const r = err.response;
    t.is(a, 42, 'exits without running route handler');
    t.is(r.data, 'oh dear', '~> received "oh dear" (custom) text');
    t.is(r.status, 501, '~> received 501 (custom) status');
    baz.server.close();
  });
});

tape('tiny::usage::sub-apps', async (t) => {
  t.plan(24);

  const foo = (req, res, next) => {
    req.foo = 'hello';
    next();
  };

  const bar = (req, res, next) => {
    t.pass('runs the sub-application middleware'); // runs 2x
    req.bar = 'world';
    next();
  };

  const sub = tiny()
    .filter(bar)
    .get('/', (req, res) => {
      t.pass('runs the sub-application / route');
      t.is(req.url, '/', '~> trims basepath from `req.url` value');
      t.is(req.originalUrl, '/sub', '~> preserves original `req.url` value');
      t.is(req.foo, 'hello', '~> receives mutatations from main-app middleware');
      t.is(req.bar, 'world', '~> receives mutatations from own middleware');
      res.end('hello from sub@index');
    })
    .get('/:bar', (req, res) => {
      t.pass('runs the sub-application /:id route');
      t.is(req.params.bar, 'hi', '~> parses the sub-application params');
      t.is(req.url, '/hi?a=0', '~> trims basepath from `req.url` value');
      t.same(req.query, { a: '0' }, '~> parses the sub-application `res.query` value');
      t.is(req.originalUrl, '/sub/hi?a=0', '~> preserves original `req.url` value');
      t.is(req.foo, 'hello', '~> receives mutatations from main-app middleware');
      t.is(req.bar, 'world', '~> receives mutatations from own middleware');
      res.end('hello from sub@show');
    });

  const app = tiny()
    .filter(foo)
    .mount('sub', sub)
    .get('/', (req, res) => {
      t.pass('run the main-application route');
      t.is(req.foo, 'hello', '~> receives mutatations from middleware');
      t.is(req.bar, void 0, '~> does NOT run the sub-application middleware');
      t.is(req.originalUrl, '/', '~> always sets `req.originalUrl` key');
      res.end('hello from main');
    });

  const uri = listen(app);

  // check sub-app index route
  const r1 = await axios.get(`${uri}/sub`);
  t.is(r1.status, 200, '~> received 200 status');
  t.is(r1.data, 'hello from sub@index', '~> received "hello from sub@index" response');

  // check main-app now
  const r2 = await axios.get(uri);
  t.is(r2.status, 200, '~> received 200 status');
  t.is(r2.data, 'hello from main', '~> received "hello from main" response');

  // check sub-app pattern route
  const r3 = await axios.get(`${uri}/sub/hi?a=0`);
  t.is(r3.status, 200, '~> received 200 status');
  t.is(r3.data, 'hello from sub@show', '~> received "hello from sub@show" response');

  app.server.close();
});

tape('tiny::usage::middleware w/ sub-app', async (t) => {
  t.plan(19);

  function verify(req, res, next) {
    t.is(req.main, true, '~> VERIFY middleware ran after MAIN');
    req.verify = true;
    next();
  }

  // Construct the "API" sub-application
  const api = tiny().filter((req, res, next) => {
    t.is(req.main, true, '~> API middleware ran after MAIN');
    t.is(req.verify, true, '~> API middleware ran after VERIFY');
    req.api = true;
    return next();
  });

  api.filter('/users', (req, res, next) => {
    t.is(req.main, true, '~> API/users middleware ran after MAIN');
    t.is(req.verify, true, '~> API middleware ran after VERIFY');
    t.is(req.api, true, '~> API/users middleware ran after API');
    req.users = true;
    next();
  });

  api.get(
    '/users/:id',
    (req, res, next) => {
      t.is(req.main, true, '~> GET API/users/:id #1 ran after MAIN');
      t.is(req.verify, true, '~> API middleware ran after VERIFY');
      t.is(req.api, true, '~> GET API/users/:id #1 ran after API');
      t.is(req.users, true, '~> GET API/users/:id #1 ran after API/users');
      t.is(req.params.id, 'BOB', '~> GET /API/users/:id #1 received the `params.id` value');
      req.userid = true;
      next();
    },
    (req, res) => {
      t.is(req.main, true, '~> GET API/users/:id #2 ran after MAIN');
      t.is(req.verify, true, '~> API middleware ran after VERIFY');
      t.is(req.api, true, '~> GET API/users/:id #2 ran after API');
      t.is(req.users, true, '~> GET API/users/:id #2 ran after API/users');
      t.is(req.userid, true, '~> GET API/users/:id #2 ran after GET API/users/:id #1');
      t.is(req.params.id, 'BOB', '~> GET /API/users/:id #2 received the `params.id` value');
      res.end(`Hello, ${req.params.id}`);
    }
  );

  // Construct the main application
  const main = tiny()
    .filter((req, res, next) => {
      req.main = true;
      return next();
    })
    .filter('/api', verify)
    .mount('/api', api);

  const uri = listen(main);

  const r = await axios.get(`${uri}/api/users/BOB`);
  t.is(r.status, 200, '~> received 200 status');
  t.is(r.data, 'Hello, BOB', '~> received "Hello, BOB" response');

  main.server.close();
});

tape('tiny::options::server', (t) => {
  const server = http.createServer();
  const app = tiny({ server });
  t.same(app.server, server, '~> store custom server internally as is');

  app.listen();
  t.same(server._events.request, app.handler, '~> attach `Tiny.handler` to custom server');

  app.server.close();
  t.end();
});

tape('tiny::options::onError', async (t) => {
  t.plan(7);

  const abc = new Error('boo~!');
  abc.code = 418; // teapot lol

  const foo = (err, req, res, next) => {
    t.is(err, abc, '~> receives the `err` object directly as 1st param');
    t.ok(req.url, '~> receives the `req` object as 2nd param');
    t.isFunction(res.end, '~> receives the `res` object as 3rd param');
    t.isFunction(next, '~> receives the `next` function 4th param'); // in case want to skip?
    res.statusCode = err.code;
    res.end(`error: ${err.message}`);
  };

  const app = tiny({ onError: foo }).filter((req, res, next) => next(abc));

  t.is(app.onError, foo, 'replaces `app.onError` with the option value');

  const uri = listen(app);

  await axios.get(uri).catch((err) => {
    const r = err.response;
    t.is(r.status, 418, '~> response gets the error code');
    t.is(r.data, 'error: boo~!', '~> response gets the formatted error message');
    app.server.close();
  });
});

tape('tiny::options::notFound', async (t) => {
  t.plan(6);

  const foo = (req, res) => {
    t.ok(req.url, '~> receives the `req` object as 1st param');
    t.isFunction(res.end, '~> receives the `res` object as 2nd param');
    res.statusCode = 405;
    res.end('prefer: Method Not Found');
  };

  const app = tiny({ notFound: foo }).get('/', () => {});

  t.is(app.notFound, foo, 'replaces `app.notFound` with the option value');
  t.not(app.onError, foo, 'does not affect the `app.onError` handler');

  const uri = listen(app);

  await axios.post(uri).catch((err) => {
    const r = err.response;
    t.is(r.status, 405, '~> response gets the error code');
    t.is(r.data, 'prefer: Method Not Found', '~> response gets the formatted error message');
    app.server.close();
  });
});
