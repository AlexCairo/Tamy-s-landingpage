const Joi = require("joi");

const productSchema = Joi.object({
    id: Joi.string(),
    codigoProducto: Joi.string().required(),
    nombreProducto: Joi.string().required(),
    precio: Joi.number().required().positive(),
    descripcion: Joi.string().required(),
    categoria: Joi.string().required(),
    subCategoria: Joi.string().required(),
    stock: Joi.number().required().integer().min(0),
    descuento: Joi.number().required()
});

module.exports = productSchema;