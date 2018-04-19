const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Good = require('good');
const HapiSwagger = require('hapi-swagger');
const config = require('config');

const review = require('./modules/review');
const swagger = require('./modules/swagger');
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
    },
    response: {
      failAction: 'ignore'
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
        basePath: '/api',
        jsonPath: '/api/schema',
        documentationPath: '/docs',
        grouping: 'tags'
      }
    },
    {
      plugin: Good,
      options: {
        reporters: {
          console: [{ module: 'good-console' }, 'stdout']
        }
      }
    },
    review,
    swagger
  ]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
