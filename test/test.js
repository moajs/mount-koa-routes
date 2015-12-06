var app = require('koa')();
var koa = require('koa-router')(); 

var index = require('./routes/index');
var users = require('./routes/users');

// routes definition
koa.use('/', index.routes(), index.allowedMethods());
koa.use('/users', users.routes(), users.allowedMethods());

// mount root routes  
app.use(koa.routes());

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

app.listen(3000);
