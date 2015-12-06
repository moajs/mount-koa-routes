var router = require('koa-router')();

router.get('/', function *(next) {
  this.body = 'this /1!';
});


router.get('2', function *(next) {
  this.body = 'this /2!';
});

module.exports = router;
