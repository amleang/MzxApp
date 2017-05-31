require('babel-polyfill')
require('babel-core/register')()
require('css-modules-require-hook/preset');
require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif', 'tiff', 'webp'],
  name: '/asset/[name].[ext]'
})

var instance = require("koa")
var bodyParser = require("koa-bodyparser")
var serve = require("koa-static")
var ex = require("koa-exception")
var routerRender = require("./src/middleware/routerRender.js");
var fs = require("fs")

var app = instance();

// 可读性输出
var log4js = require('log4js');
log4js.configure({
    "appenders": [{
        "type": "console"
    }]
}
);
/**
 * , {
        "type": "file",
        "filename": __dirname+ "/logs/access.log",
        "category": "web"
    }
 */
var logger = log4js.getLogger('web');
app.logger = logger;

// 静态目录
app.use(serve(__dirname + "/public"));

// Cross-origin
app.use(function* (next) {
  this.set('Access-Control-Allow-Origin', '*');
  yield next;
});

// X-Response-Time Middleware
app.use(function* (next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// Logger middleware
app.use(function* (next) {
    logger.info(this.url + "- "+this.method+" -" + "query:"+JSON.stringify(this.query));
    yield next;
});

// 异常统一处理器: 捕获业务代码抛出的异常,用户也可自己手动捕获异常,手动捕获后将不会被该处理器处理.
app.use(ex('CN'));
// body格式化
app.use(bodyParser());



// 启动路由
// routerRender(app);
// Logger middleware
app.use(routerRender.default(app));

// 版本控制
global.version = 1;

// service 层初始化
// 路由目录下的文件
var files = fs.readdirSync(__dirname + '/service');

// 过滤出.js文件:
var js_files = files.filter((f) => {
  return f.endsWith('.js') && f != "base.js";
}, files);

// 路由目录
var routerDir = __dirname + '/service/';
// 自动导入自定义路由
for (var i = 0; i < js_files.length; i++) {
  app.use(require(routerDir + js_files[i]).routes());
}

// 不能改
var port = 3002;
app.listen(port, function() {
  console.log('Server running on port ' + port);
});

app.on('error', function(err, ctx){
  // log.error('server error', err, ctx);
});