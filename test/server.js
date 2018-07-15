const Koa = require('koa');
const {join} = require('path');
const mount = require('../');

const app = new Koa();

// simple
// mount(app);
// with path
mount(app, join(__dirname, '..', 'routes'), true, '/a');
mount(app, join(__dirname, '..', 'routes2'), true);

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

module.exports = app;
