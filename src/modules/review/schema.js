const Joi = require('joi');

const reviewSchema = Joi.object({
  firstName: Joi.string()
    .empty('')
    .required(),
  lastName: Joi.string()
    .empty('')
    .required(),
  email: Joi.string()
    .empty('')
    .regex(/^.+@.+$/)
    .required(),
  score: Joi.number()
    .integer()
    .empty('')
    .min(0)
    .max(10)
    .required(),
  comment: Joi.string()
    .empty('')
    .max(250),
  date: Joi.date()
    .empty('')
    .required(),
  willComeAgain: Joi.string()
    .empty('')
    .valid(['yes', 'no', 'maybe'])
}).label('Review');

const reviewCollectionSchema = Joi.array()
  .items(reviewSchema)
  .label('ReviewCollection');

const noContentSchema = Joi.string()
  .max(0)
  .label('NoContent');

module.exports = { reviewSchema, reviewCollectionSchema, noContentSchema };
