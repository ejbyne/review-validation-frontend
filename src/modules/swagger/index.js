const swaggerPlugin = {
  name: 'swagger plugin',
  version: '1.0.0',
  async register(server) {
    server.ext('onPreResponse', (request, h) => {
      // Fix for hapi-swagger incorrect regex formatting
      if (request.path === '/api/schema') {
        request.response.source = JSON.parse(
          JSON.stringify(request.response.source)
            .replace(/(?<="pattern":")\//g, '')
            .replace(/(?<="pattern":".+?)\//g, '')
        );
      }
      return h.continue;
    });
  }
};

module.exports = swaggerPlugin;
