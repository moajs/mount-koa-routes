const Koa = require('koa');
const app = new Koa();

const mount = require('./');

// simple
// mount(app);
// with path
mount(app, __dirname + '/routes2', true);

// with path & api dump
// mount(app,  __dirname + '/routes', true);

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

app.listen(3000);
