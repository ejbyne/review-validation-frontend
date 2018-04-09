const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  score: Number,
  comment: String,
  date: Date,
  willComeAgain: Boolean
});

const Review = mongoose.model('Review', schema);

module.exports = Review;
