var router = require('koa-router')();

router.get('/', function *(next) {
  this.body = 'this a users response!';
});

router.post('/2', function *(next) {
  this.body = 'this a users response!';
});

module.exports = router;
