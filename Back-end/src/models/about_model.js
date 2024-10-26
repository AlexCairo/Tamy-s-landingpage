const Joi = require('joi');

const sobreNosotrosSchema = Joi.object().keys({
  acerca_de: Joi.string().required(),
  mision: Joi.string().required(),
  vision: Joi.string().required(),
  lema: Joi.string().required()
});

const contactosSchema = Joi.object().keys({
  gmail: Joi.string().email().required(),
  telefono: Joi.string().required(),
  direccion: Joi.string().required()
});

const aboutSchema = Joi.object().keys({
  sobre_nosotros: sobreNosotrosSchema.required(),
  contactos: contactosSchema.required()
});

module.exports = aboutSchema;