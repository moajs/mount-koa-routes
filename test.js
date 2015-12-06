var app = require('koa')();

var mount = require('./');

// simple
// mount(app);
// with path
// mount(app, __dirname + '/routes2');

// with path & api dump
mount(app,  __dirname + '/routes2', true);

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

app.listen(3000);
