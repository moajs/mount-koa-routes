var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});

router.post('/2', function (ctx, next) {
  ctx.body = 'this a users response!';
});

module.exports = router;
