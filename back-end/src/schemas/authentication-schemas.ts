import { SignInParams } from "@/services";
import Joi from "joi";

export const signInSchema = Joi.object<SignInParams>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
