var schemaInit = require('./schema');
var config = require('../config');

module.exports = app => {

    app.config = config;

    app.models = schemaInit().models;

    require('./models_extend')(app);
};