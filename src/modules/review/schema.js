const Joi = require('joi');

const reviewSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .regex(/^.+@.+$/)
    .required(),
  score: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .required(),
  comment: Joi.string().max(250),
  date: Joi.date().required(),
  willComeAgain: Joi.string().valid(['yes', 'no', 'maybe'])
}).label('Review');

const reviewCollectionSchema = Joi.array()
  .items(reviewSchema)
  .label('ReviewCollection');

const noContentSchema = Joi.string()
  .max(0)
  .label('NoContent');

module.exports = { reviewSchema, reviewCollectionSchema, noContentSchema };
