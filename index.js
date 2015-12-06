var fs     = require('fs');
var requireDirectory = require('require-directory');
var routes = requireDirectory(module, './routes');

var koa = require('koa-router')(); 

var stack = [];
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
  // console.log(r)
  // console.log(pre)
  // console.log(app)
  for (var k in r) {
    var path = '';
    
    if(typeof r[k].stack == 'object') {
      var file = '/' + pre + '' + k + '.js';
      console.log('mount route ' + file + " ");
      if(k === 'index') {
        path = '/'+ pre;
        // console.log('sang path= ' + path);
        // console.log('sang k= ' + r[k]);
        _use(koa, file, path, r[k]);
      }else{
        // console.log('this is a obj');
        path = '/' + pre + '' + k;
        // console.log(pre + ' path='+path);
        _use(koa, file, path, r[k]);
      }
    }else {
      // nest
      // /api/*
      mount(koa, r[k], pre + k + '/');
    }
  }
}

function _use(app, file, path, handler) {
  // console.dir(path)
  // console.dir(handler.routes())
  // console.log(handler.stack)
  // app.use(path, handler);
  
  koa.use(path, handler.routes());//, handler.allowedMethods());
  
  _track_routes(file, path, handler.routes());
}

function _track_routes(file, path, handle) {
  for(var i in handle){
    // console.log(i);
    // console.log(handle[i].stack);
    // return;
    var _route = handle[i].stack;
    for(var z in _route){
      var layer = _route[z];
      // console.dir(layer);
      // console.log(_route);
      // console.log(_route.stack);
      // console.log(layer.methods);
      var params = layer.paramNames;
    
      for(var j in layer.methods){
        if(layer.methods[j] == 'HEAD'){
          // console.log(layer.methods[j]); 
        }else{
          // console.log('path2 = '+layer.path);
          if(layer.path == '/'|| layer.path == '//'){
            _cache_to_stack(file, layer.path, layer.methods[j]);
          }else{
            _cache_to_stack(file, layer.path, layer.methods[j]);
          }
        }
      }
    }    
  }
}

function _cache_to_stack(file, path, method) {
  // console.log(file+ ' ' +method + ' ' + path);
  path = path.replace(new RegExp(/\/\//g),'/');
  stack.push({
    file    : file,
    method  : method,
    path    : path
  });
}

function _dump(routes_folder_path) {
  var Table = require('cli-table');
  var table = new Table({ head: ["File", "Method", "Path"] });

  // console.log(stack)
  console.log('\n******************************************************');
  console.log('\t\tMoaJS Apis Dump');
  console.log('******************************************************\n');
  
  for (var k in stack) {
    var obj = stack[k];
    // console.dir(k)
    // console.log(obj.file + obj.method + obj.path)
    table.push(
        [routes_folder_path + obj.file, obj.method, obj.path]
    );
  }

  console.log(table.toString());
}

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
  
  mount(koa) ;
  // console.log(koa.routes());
  app.use(koa.routes());
  
  if(is_debug){
    _dump (routes_folder_path);
  }
}

module.exports = mount_with_folder;