var router = require('koa-router')();

router.get('/', function *(next) {
  this.body = 'this a /api response!';
});

module.exports = router;
