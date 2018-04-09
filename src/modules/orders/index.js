const Joi = require('joi');
const Boom = require('boom');

const Order = require('./Order');

const orders = {
  name: 'orders',
  version: '1.0.0',
  async register(server) {
    server.route({
      method: 'GET',
      path: '/orders',
      async handler() {
        const collection = await Order.find();
        return collection;
      }
    });

    server.route({
      method: 'POST',
      path: '/orders',
      async handler(request, h) {
        const order = await new Order(request.payload).save();
        return h.response(order).code(201);
      },
      options: {
        validate: {
          payload: {
            firstName: Joi.string(),
            lastName: Joi.string(),
            date: Joi.date()
          }
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/orders/{id}',
      async handler(request) {
        const order = await Order.findById(request.params.id);
        if (!order) {
          return Boom.notFound();
        }
        return order;
      }
    });

    server.route({
      method: 'PATCH',
      path: '/orders/{id}',
      async handler(request) {
        const order = await Order.findByIdAndUpdate(
          request.params.id,
          request.payload
        );
        if (!order) {
          return Boom.notFound();
        }
        const updatedOrder = await Order.findById(request.params.id);
        return updatedOrder;
      }
    });

    server.route({
      method: 'DELETE',
      path: '/orders/{id}',
      async handler(request, h) {
        const order = await Order.findByIdAndRemove(request.params.id);
        if (!order) {
          return Boom.notFound();
        }
        return h.response().code(204);
      }
    });

    server.route({
      method: 'DELETE',
      path: '/orders',
      async handler(request, h) {
        await Order.remove();
        return h.response().code(204);
      }
    });
  }
};

module.exports = orders;
