var app = require('koa')();
var koa = require('koa-router')(); 


var mount = require('./');


app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});


// var index = require('./routes/index');
// var users = require('./routes/users');
//
// // routes definition
// koa.use('/', index.routes(), index.allowedMethods());
// koa.use('/users', users.routes(), users.allowedMethods());

// mount root routes  
// app.use(koa.routes());

mount(app,'./routes', true);

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

app.listen(3000);
