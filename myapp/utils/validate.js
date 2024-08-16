const Joi = require("joi")

const taskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .pattern(/^([a-zA-Z0-9]( )?)+$/)
    .messages(),
  description: Joi.string()
    .min(3)
    .max(5000)
    .required()
    .pattern(/^([a-zA-Z0-9]( )?)+$/)
    .messages(),
});

const schemaRegister = Joi.object({
  fName: Joi.string().min(1).max(50).required().messages(),
  lName: Joi.string().min(1).max(50).required().messages(),
  email: Joi.string().email().required().messages(),
  password: Joi.string().min(8).required().messages(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required().messages(),
  password: Joi.string().min(8).required().messages(),
});


module.exports = {schemaLogin, schemaRegister,taskSchema}