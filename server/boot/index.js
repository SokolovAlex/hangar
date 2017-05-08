var schemaInit = require('./schema');
var passportInit = require('./passport');

module.exports = (app, passport) => {
    app.models = schemaInit().models;

    require('./models_extend')(app);

    passportInit(app, passport);
};