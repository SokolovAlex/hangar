const riot = require('riot');
require('./tags/admin');
const route = require('riot-route');
const api = require('./services/api');
const initMixins = require('./tags/mixins');

let menu, page;
let pageEl = document.getElementById('page_content');

initMixins();

const routes = {
    products() {
        riot.mount(pageEl, "loader");
        api.getProducts().then((products) => {
            page = riot.mount(pageEl, "products", { products })[0];
        });
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
        api.getUser(id).then((user) => {
            page = riot.mount(pageEl, "user-details", { user })[0];
        });
    },
    "product-details": (id) => {
        riot.mount(pageEl, "loader");
        api.getProduct(id).then((response) => {
            page = riot.mount(pageEl, "product-details", { product: response.product, types: response.types })[0];
        });
    }
};

route((page, param) => {
    page = page || 'products';
    if (menu) {
        menu.update({ page });
    } else {
        menu = riot.mount('admin-menu', { page })[0];
    }

    let routeFn = routes[page] || routes['products'];
    routeFn(param);
});

route.start(true);