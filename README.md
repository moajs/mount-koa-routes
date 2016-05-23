# mount-koa-routes

mount-koa-routes = auto mount koajs v2.x routes（base on koa-router） with routes_folder_path

[![gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]

## Install

    npm install --save mount-koa-routes@next

## Usages

```
var app = require('koa')();

var mount = require('mount-koa-routes');

// simple
mount(app);
// with path
// mount(app, __dirname + '/routes2');

// with path & api dump
// mount(app,  __dirname + '/routes', true);

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

app.listen(3000);
```

## Routes

```
var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'this /1!';
});


router.get('2', function (ctx, next) {
  ctx.body = 'this /2!';
});

module.exports = router;
```

一定要区分

```
url = /2
router.get('2', function (ctx, next) {
  ctx.body = 'this /2!';
});
```

```
url = //2
router.get('/2', function (ctx, next) {
  ctx.body = 'this /2!';
});
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## 版本历史

- v2.0.0 init for koa v2.x
- v1.0.3 add api dump feature
- v1.0.2 rename index to /
- v1.0.0 初始化版本


## 欢迎fork和反馈

- write by `i5ting` shiren1118@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).


[npm-image]: https://img.shields.io/npm/v/mount-koa-routes.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mount-koa-routes
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/i5ting/mount-koa-routes?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge