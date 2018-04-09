const Hapi = require('hapi');
const config = require('config');

const orders = require('./modules/orders');

require('./db');

const server = Hapi.server({
  port: config.server.port,
  routes: {
    validate: {
      failAction: async (request, h, err) => {
        throw err;
      },
      options: {
        abortEarly: false
      }
    }
  }
});

const init = async () => {
  await server.register({
    plugin: orders
  });
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
