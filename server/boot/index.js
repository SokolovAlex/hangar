var schemaInit = require('./schema');
var passportInit = require('./passport');

module.exports = (app, passport) => {
    let schema = schemaInit();
    
    app.models = schema.models;

    require('./models_extend')(app);

    passportInit(app, passport);

    schema.isActual(function(err, actual) {
        if (!actual) {
            console.log("db autoupdate");
            schema.autoupdate();
        }
    });
};