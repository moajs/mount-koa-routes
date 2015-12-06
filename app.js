var koa = require('koa-router')()
  , fs     = require('fs')
  , requireDirectory = require('require-directory')
  , routes = requireDirectory(module, './routes')

/**
 * Mount routes with directory.
 *
 * Examples:
 *
 *     // mount routes in app.js
 *     mount(app, 'routes2', true);
 *
 * @param {Object} app
 * @param {String} routes_folder_path
 * @param {Boolean} is_debug
 * @return 
 * @api public
 */
function mount_with_folder(app, routes_folder_path) {
  stack = [];// empty when enter
  
  var r         = arguments[1] || './routes';
  var is_debug  = arguments[2] || false;
  
  // console.log('mount routes_folder_path = ' + r)
  routes = requireDirectory(module, r);
  
  console.log(routes);
  mount(app);
  
  if(is_debug){
    // _dump (routes_folder_path);
  }
}

module.exports = mount_with_folder;


/**
 * Mount routes with directory.
 *
 * Examples:
 *
 *     // mount routes in app.js
 *     require('./config/routes')(app);
 *
 * @param {Object} app
 * @param {Object} routes
 * @param {String} pre
 * @return 
 * @api public
 */
function mount(app) {
  var r = arguments[1] || routes;
  var pre = arguments[2] || '';
  
  for (var k in r) {
    var file = '/' + pre + '' + k + '.js';
    // console.log('mount route ' + file + " ");
    var path = '';
    if(typeof r[k] == 'object') {
      // console.log('this is a obj');
      mount(app, r[k], pre + k + '/');
    }else if(k === 'index') {
      path = '/'+ pre;
      _use(app, file, path, r[k]);
    }else {
      path = '/' + pre + '' + k;
      _use(app, file, path, r[k]);
    }
  }
}