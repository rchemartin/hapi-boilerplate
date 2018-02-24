const Joi = require('joi');

const schema = Joi.object().keys({
    login : Joi.string().required(),
    password : Joi.string().alphanum().min(8).required(),
    email : Joi.string().email().required(),
    firstname : Joi.string().required(),
    lastname : Joi.string().required(),
    company : Joi.string().alphanum().min(3).max(40),
    function : Joi.string().alphanum().min(3).max(40),
});

module.exports = schema;
