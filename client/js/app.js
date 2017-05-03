var riot = require('riot');
require('./tags');
var route = require('riot-route');

let menu, page;
let pageEl = document.getElementById('page_content');

const routes = {
    enter() {
        page = riot.mount(pageEl, "auth-menu")[0];
    },
    about() {
        page = riot.mount(pageEl, "about")[0];
    },
    contacts() {
        page = riot.mount(pageEl, "contacts")[0];
    }
};

route((page) => {
    page = page || 'enter';

    if (menu) {
        menu.update({ page });
    } else {
        menu = riot.mount('main-menu', { page })[0];
    }

    let routeFn = routes[page];
    routeFn();
});

route.start(true);