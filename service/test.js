var base = require('./base');
var dao = require("../dao/test.js");
var router = new base({
    prefix: '/API/test'
});

router.get("/", function* (){
    var res = yield dao.list();
    this.body = {code: 100, data:JSON.stringify(res)}
})

module.exports = router;