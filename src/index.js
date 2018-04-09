const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const config = require('config');

const review = require('./modules/review');
require('./db');

const server = Hapi.server({
  port: config.server.port,
  router: {
    isCaseSensitive: false,
    stripTrailingSlash: true
  },
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
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'JSUnconf Review API',
          version: '1.0'
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        jsonPath: '/schema',
        documentationPath: '/docs'
      }
    },
    {
      plugin: review
    }
  ]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
