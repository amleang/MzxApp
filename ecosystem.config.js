module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'Mzx',
      script    : './server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'zal',
      host : '192.168.184.129',
      ref  : 'origin/master',
      repo : 'git@github.com:amleang/Mzx.git',
      path : '/home/zal/www/production',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env production'
    
    }
  }
};
