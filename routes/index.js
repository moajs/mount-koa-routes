var router = require('koa-router')();

router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});


router.get('/2', function *(next) {
    this.body = 'this /2!';
});

module.exports = router;
