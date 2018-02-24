'use strict';

const handler = require('../handlers/user');
const userSchema = require('../schemas/user');
const login = require('../schemas/login');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'POST',
            path   : '/user',
            config : {
                description : 'Create user',
                notes       : 'Creates a user',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : userSchema,
                },
                handler     : handler.create,
            },
        },
        {
            method : 'GET',
            path   : '/user/all',
            config : {
                description : 'Get users',
                notes       : 'Get every users',
                tags        : ['api'],
                handler     : handler.getUsers,
            },
        },
        {
            method : 'GET',
            path   : '/user/{_id}',
            config : {
                description : 'Get users',
                notes       : 'Get every users',
                tags        : ['api'],
                handler     : handler.getUser,
                validate : {
                    params : {
                        _id : Joi.objectId().required(),
                    },
                },
            },
        },
        {
            method : 'PUT',
            path   : '/user/{_id}',
            config : {
                description : 'Update user',
                notes       : 'Update user',
                tags        : ['api'],
                handler     : handler.updateUser,
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : userSchema,
                    params : {
                        _id : Joi.string().required(),
                    },
                },
            },
        },
        {
            method : 'PUT',
            path   : '/users/generate',
            config : {
                description : 'Generate 100 users',
                notes       : 'Generate 100 users',
                tags        : ['api'],
                handler     : handler.generateUsers,
            },
        },
        {
            method : 'DELETE',
            path   : '/user/delete/{_id}',
            config : {
                description : 'Deletes a specified user',
                notes       : 'Deletes a specified user',
                tags        : ['api'],
                handler     : handler.deleteUser,
                validate : {
                    params : {
                        _id : Joi.objectId().required(),
                    },
                },
            },
        },
        {
            method : 'POST',
            path   : '/login',
            config : {
                description : 'Log in',
                notes       : 'Log in',
                tags        : ['api'],
                handler     : handler.login,
                validate : {
                    payload : login,
                },
            },
        },
        {
            method : 'POST',
            path   : '/password/reset/{_id}',
            config : {
                description : 'Resets user password',
                notes       : 'Resets user password',
                tags        : ['api'],
                handler     : handler.resetPassword,
                validate : {
                    payload : {
                        password : Joi.string().alphanum().min(8).required(),
                    },
                    params : {
                        _id : Joi.string().alphanum().min(8).required(),
                    },
                },
            },
        },
    ]);
    next();
};

exports.register.attributes = {
    name : 'user-routes',
};
