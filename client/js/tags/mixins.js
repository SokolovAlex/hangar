const riot = require('riot');
const api = require('../services/api');
const route = require('riot-route');
const _ = require('lodash');

module.exports = () => {
    const syncMixin = {
        sync(model, property, event) {
            let el = event.srcElement;
            model[property] = el.value;
        }
    };

    riot.mixin('api', { api });
    riot.mixin('route', { route });
    riot.mixin('sync', syncMixin);

    window._ = _;
}