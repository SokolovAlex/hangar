var riot = require('riot');
require('./tags');
var route = require('riot-route');

let app = riot.mount('app', { tab: 'enter' })[0];

route("/*", (tab) => {
    console.log({ tab });
    app.update({ tab })
});

route.start();