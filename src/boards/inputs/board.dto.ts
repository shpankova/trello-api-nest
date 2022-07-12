import * as Joi from '@hapi/joi';

export const BoardSchema = Joi.object({
  name: Joi.string().max(40).required(),
  color: Joi.string().max(40).required(),
  description: Joi.string().required(),
  board_id: Joi.number().integer(),
}).options({
  abortEarly: false,
});
