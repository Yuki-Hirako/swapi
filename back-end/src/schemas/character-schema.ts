import Joi from "joi";

export const characterSchema = Joi.object({
  name: Joi.string().required(),
  birth_year: Joi.string().required(),
  gender: Joi.string().required(),
});
