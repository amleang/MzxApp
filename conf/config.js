var env = process.env.NODE_ENV;
var allowEnvs = ['production','test', 'dev'];
if ( allowEnvs.indexOf(env) < 0 ) {
  // Invalidation env. Load with a default value:development.
  env = 'test';
}
// console.log('---> 当前环境变量: NODE_ENV='+env);

var db = require('./'+env);
var config = {
  // Mongo: 'mongodb://172.20.8.109:27017/davy'
  Mongo:db.mongo,//'mongodb://172.20.8.109:27017,172.20.8.110:27017/davy?replicaSet=rs0&readPreference=secondary&extendedOperators=true'
  server_java: db.server_java
};

module.exports = config;