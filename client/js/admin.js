var riot = require('riot');
require('./tags/admin');
var route = require('riot-route');

let menu, page;
let pageEl = document.getElementById('page_content');

const routes = {
    products() {
        page = riot.mount(pageEl, "products")[0];
    },
    transactions() {
        page = riot.mount(pageEl, "transactions")[0];
    },
    users() {
        page = riot.mount(pageEl, "users")[0];
    }
};

route((page) => {
    page = page || 'products';
    if (menu) {
        menu.update({ page });
    } else {
        menu = riot.mount('admin-menu', { page })[0];
    }

    let routeFn = routes[page];
    routeFn();
});

route.start(true);