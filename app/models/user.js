'use strict';

const jsonToMongoose    = require('json-mongoose');
const async             = require('async');
const bcrypt            = require('bcrypt');
const mongoose          = require('k7-mongoose').mongoose();
const encrypt           = require('@romainch87/encrypt');

module.exports = jsonToMongoose({
    mongoose    : mongoose,
    collection  : 'user',
    schema      : require('../schemas/user'),
    pre         : {
        save : (doc, next) => {
            async.parallel({
                password : (done) => {
                    doc.password = encrypt(doc.password);
                    console.log(doc.password);
                    done();
                },
            }, next);
        },
    },
    schemaUpdate : (schema) => {
        schema.login.unique         = true;
        schema.email.unique  = true;

        return schema;
    },
    transform : (doc, ret, options) => {
        delete ret.password;

        return ret;
    },
    options : {

    },
});
