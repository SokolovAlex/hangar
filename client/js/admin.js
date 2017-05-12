const riot = require('riot');
require('./tags/admin');
const route = require('riot-route');
const api = require('./services/api');

let menu, page;
let pageEl = document.getElementById('page_content');

riot.mixin('api', { api });

const routes = {
    products() {
        page = riot.mount(pageEl, "products")[0];
    },
    transactions() {
        page = riot.mount(pageEl, "transactions")[0];
    },
    users() {
        riot.mount(pageEl, "loader");
        api.getUsers().then((users) => {
            page = riot.mount(pageEl, "users", { users })[0];
        });
    },
    "user-details": (id) => {
        if (!id) {
            return page = riot.mount(pageEl, "user-details")[0];
        }
        riot.mount(pageEl, "loader");
        api.getUsers().then((users) => {
            let user = { id };
            page = riot.mount(pageEl, "user-details", { user })[0];
        });
    }
};

route((page) => {
    page = page || 'products';
    if (menu) {
        menu.update({ page });
    } else {
        menu = riot.mount('admin-menu', { page })[0];
    }

    let routeFn = routes[page] || routes['products'];
    routeFn();
});

route.start(true);