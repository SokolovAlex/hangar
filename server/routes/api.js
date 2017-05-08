var express = require('express');
var router = express.Router();
var authenticate = require('../helpers/authenticate');

var usersApi = require('./api/user');
var productApi = require('./api/product');
var transactionsApi = require('./api/transaction');

module.exports = (app, passport) => {

    router = usersApi(router, app);

    router = productApi(router, app);

    router = transactionsApi(router, app);

    return router;
};