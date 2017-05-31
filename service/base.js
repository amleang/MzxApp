var KoaRouter = require('koa-router');
var formidable = require('formidable');
var path = require('path');
var os = require('os');
var superAgent = require("superagent");

/**
 *  上传文件表单转换.
 *  返回文件路径(用完记得删除文件)
 */
KoaRouter.prototype.formParse = function (ctx) {
  return function (done) {
    var form = new formidable.IncomingForm();
    //设置上传目录
    form.uploadDir = os.tmpdir();
    form.keepExtensions = true;
    form.parse(ctx.req, function (err, fields, files) {
      if (err) {
        done(err, null);
      }
    //   var path = files.upfile.path;
      done(null, files);
    });
  }
}

KoaRouter.prototype.formParseMulti = function (ctx) {
  return function (done) {
    var form = new formidable.IncomingForm();
    //设置上传目录
    form.uploadDir = '/tmp/'
    form.keepExtensions = true;
    form.multiples=true;//设置为多文件上传  
    var files=[];  
    //文件都将保存在files数组中  
    form.on('file', function (filed,file) {  
        files.push([filed,file]);  
    })
    form.parse(ctx.req, function (err, fields, fsObj) {
      if (err) {
         done(null, fsObj);
      }
      if(!fsObj.upfile.length) {
        var fileArray = [fsObj.upfile];
        done(null, {upfile: fileArray});
      }
      else done(null, fsObj);
    });
  }
}

KoaRouter.prototype.getData = function (url, params) {
  return function (done) {
      superAgent.get(url)
        .query(params)
        .end((err, res) => {
            if(!!res && res.body) done(null, res.body)
        })
  }
}

KoaRouter.prototype.postData = function (url, params) {
  return function (done) {
      superAgent.post(url)
        .send(params)
        .end((err, res) => {
            if(!!res && res.body) done(null, res.body)
        })
  }
}

module.exports = KoaRouter;