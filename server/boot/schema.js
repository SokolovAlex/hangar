var Schema = require('jugglingdb').Schema;
var _ = require('lodash');
var config = require('../config');
var enums = require('../enums');

module.exports = () => {
    var schema = new Schema('memory');

    schema.on('connected', function() {
        console.log("db connected");
    });

    schema.on('log', function(msg, duration) {
        console.log("db log", msg, duration);
    });

    var baseModel = {
        created: {
            type: Date,
            default: function() {
                return new Date
            }
        },
        modified: {
            type: Date,
            default: function() {
                return new Date
            }
        }
    };

    var User = schema.define('User', _.extend({
        id: { type: Number, index: true },
        hash: { type: String, limit: 150 },
        email: { type: String, limit: 50, index: true },
        firstName: { type: String, limit: 50 },
        lastName: { type: String, limit: 50 },
        password: { type: String, limit: 150 },
        salt: { type: String, limit: 50 },
        birthDate: Date,
        activated: { type: Boolean, default: false }
    }, baseModel), {
        table: 'users'
    });

    var Role = schema.define('Role', _.extend({
        id: { type: Number, limit: 50, index: true },
        name: { type: String, limit: 50 }
    }, baseModel), {
        table: 'roles'
    });

    var Product = schema.define('Product', _.extend({
        id: { type: Number, limit: 50, index: true },
        userId: { type: Number, limit: 10 },
        description: { type: String, limit: 50 },
        name: { type: String, limit: 50 },
        cost: { type: Number, limit: 50 },
        selled: Date,
        type: { type: Number, default: enums.ProductTypes.none }
    }, baseModel), {
        table: 'products'
    });

    var Image = schema.define('Image', _.extend({
        id: { type: Number, limit: 50, index: true },
        name: { type: String, limit: 100 },
        description: { type: String }
    }, baseModel), {
        table: 'images'
    });

    var Transaction = schema.define('Transaction', _.extend({
        id: { type: Number, limit: 50, index: true },
        amount: { type: String, limit: 100 }
    }, baseModel), {
        table: 'transactions'
    });

    User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' });

    Product.belongsTo(Image, { as: 'image', foreignKey: 'imageId' });

    Transaction.belongsTo(User, { as: 'user', foreignKey: 'UserId' });

    schema.isActual(function(err, actual) {
        if (!actual) {
            console.log("db autoupdate");
            //schema.automigrate();
            schema.autoupdate();
        }
    });

    return schema;
};