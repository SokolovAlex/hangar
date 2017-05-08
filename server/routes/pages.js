var express = require('express');
var router = express.Router();

module.exports = app => {

    router.get('/', (req, res) => {
        if (!req.user) {
            return res.render('welcome');
        }
        res.render('admin', { user: req.user });
    });

    return router;
};