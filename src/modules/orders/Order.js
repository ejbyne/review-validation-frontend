const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  date: Date
});

const Order = mongoose.model('Order', schema);

module.exports = Order;
