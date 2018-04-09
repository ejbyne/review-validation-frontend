const Joi = require('joi');
const Boom = require('boom');

const Review = require('./Review');

const reviewPlugin = {
  name: 'review plugin',
  version: '1.0.0',
  async register(server) {
    server.route({
      method: 'GET',
      path: '/reviews',
      async handler() {
        const collection = await Review.find();
        return collection;
      },
      options: {
        tags: ['api']
      }
    });

    server.route({
      method: 'POST',
      path: '/reviews',
      async handler(request, h) {
        const review = await new Review(request.payload).save();
        return h.response(review).code(201);
      },
      options: {
        tags: ['api'],
        validate: {
          payload: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().regex(/.+@.+/),
            score: Joi.number()
              .integer()
              .min(0)
              .max(10)
              .required(),
            comment: Joi.string().max(250),
            date: Joi.date().required(),
            willComeAgain: Joi.boolean()
          }
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/reviews/{id}',
      async handler(request) {
        try {
          const review = await Review.findById(request.params.id);
          return review;
        } catch (err) {
          return Boom.notFound();
        }
      },
      options: {
        tags: ['api']
      }
    });

    server.route({
      method: 'PATCH',
      path: '/reviews/{id}',
      async handler(request) {
        try {
          await Review.findByIdAndUpdate(request.params.id, request.payload);
          return Review.findById(request.params.id);
        } catch (err) {
          return Boom.notFound();
        }
      },
      options: {
        tags: ['api']
      }
    });

    server.route({
      method: 'DELETE',
      path: '/reviews/{id}',
      async handler(request, h) {
        try {
          await Review.findByIdAndRemove(request.params.id);
          return h.response().code(204);
        } catch (err) {
          return Boom.notFound();
        }
      },
      options: {
        tags: ['api']
      }
    });

    server.route({
      method: 'DELETE',
      path: '/reviews',
      async handler(request, h) {
        await Review.remove();
        return h.response().code(204);
      },
      options: {
        tags: ['api']
      }
    });
  }
};

module.exports = reviewPlugin;
