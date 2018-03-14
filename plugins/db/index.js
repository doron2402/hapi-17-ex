'use stirct';

const { Pool } = require('pg')


async function register (server, options) {
  /**
   * on incoming request (before handler) get a db connection from pool
   */
  server.ext('onPreHandler', function (request, h) {
      const pool = new Pool({
        user: 'doron',
        host: 'localhost',
        database: 'nexar',
        password: 'pass123',
        port: 5432
      });
      pool.on('error', (err, client) => {
        console.log('Unexpected error on idle client', err);
        process.exit(-1);
      });
      server.app.pgClient = pool;
      return h.continue;
  });

  server.ext('onPreResponse', function(request, h) {
    if (server.app.pgClient && server.app.pgClient.release) {
      server.app.pgClient.release();
    }
    return h.continue;
  });

}

module.exports = {
  register,
  name: 'db-plugins-v1.0.0'
}
