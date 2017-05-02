var riot = require('riot');
require('./tags');
var route = require('riot-route');

let app;

route("/*", (tab) => {
    if (app) {
        app.update({ tab });
    } else {
        app = riot.mount('app', { tab })[0];
    }
});

route.start(true);