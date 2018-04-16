const Boom = require('boom');

const Review = require('./Review');
const {
  reviewSchema,
  reviewCollectionSchema,
  noContentSchema
} = require('./schema');

const reviewPlugin = {
  name: 'review plugin',
  version: '1.0.0',
  async register(server) {
    server.route({
      method: 'GET',
      path: '/api/reviews',
      async handler() {
        const collection = await Review.find();
        return collection;
      },
      options: {
        tags: ['api', 'reviews'],
        response: {
          status: {
            200: reviewCollectionSchema
          }
        }
      }
    });

    server.route({
      method: 'POST',
      path: '/api/reviews',
      async handler(request, h) {
        const review = await new Review(request.payload).save();
        return h.response(review).code(201);
      },
      options: {
        tags: ['api', 'reviews'],
        validate: {
          payload: reviewSchema
        },
        response: {
          status: {
            201: reviewSchema
          }
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/reviews/{id}',
      async handler(request) {
        try {
          const review = await Review.findById(request.params.id);
          return review;
        } catch (err) {
          return Boom.notFound();
        }
      },
      options: {
        tags: ['api', 'reviews'],
        response: {
          status: {
            200: reviewSchema
          }
        }
      }
    });

    server.route({
      method: 'PUT',
      path: '/api/reviews/{id}',
      async handler(request) {
        try {
          await Review.findByIdAndUpdate(request.params.id, request.payload);
          return Review.findById(request.params.id);
        } catch (err) {
          return Boom.notFound();
        }
      },
      options: {
        tags: ['api', 'reviews'],
        validate: {
          payload: reviewSchema
        },
        response: {
          status: {
            200: reviewSchema
          }
        }
      }
    });

    server.route({
      method: 'DELETE',
      path: '/api/reviews/{id}',
      async handler(request, h) {
        try {
          await Review.findByIdAndRemove(request.params.id);
          return h.response().code(204);
        } catch (err) {
          return Boom.notFound();
        }
      },
      options: {
        tags: ['api', 'reviews'],
        response: {
          status: {
            204: noContentSchema
          }
        }
      }
    });

    server.route({
      method: 'DELETE',
      path: '/api/reviews',
      async handler(request, h) {
        await Review.remove();
        return h.response().code(204);
      },
      options: {
        tags: ['api', 'reviews'],
        response: {
          status: {
            204: noContentSchema
          }
        }
      }
    });
  }
};

module.exports = reviewPlugin;
