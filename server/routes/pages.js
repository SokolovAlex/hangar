var express = require('express');
var router = express.Router();
var menuHelper = require('../helpers/menuHelper');
var authenticate = require('../helpers/authenticate');
var auth_cookie = 'x-auth';

module.exports = app => {

    router.get('/', (req, res) => {
        var user = req.cookies[auth_cookie];
        res.render('welcome', { menu: menuHelper.welcome(user), actions: menuHelper.commonActions() });
    });

    return router;
};