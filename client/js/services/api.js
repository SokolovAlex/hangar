const request = require('superagent');

const promises = {};

module.exports = {
    getUsers(filter) {
        if (!promises.usersReady) {
            promises.usersReady = new Promise((resolve, reject) => {
                request.get('/api/users')
                    .end(function(err, res) {
                        let responseData;
                        if (res.ok) {
                            responseData = JSON.parse(res.text);
                        }
                        resolve(responseData.users);
                    });
            });
        }
        return promises.usersReady;
    },
    getUser(id) {
        return new Promise((resolve, reject) => {
            request.get(`/api/users/${id}`)
                .end((err, res) => {
                    let responseData;
                    if (res.ok) {
                        responseData = JSON.parse(res.text);
                    }
                    resolve(responseData);
                });
        });
    },
    getProducts(filter) {
        if (!promises.productsReady) {
            promises.productsReady = new Promise((resolve, reject) => {
                request.get('/api/products')
                    .end((err, res) => {
                        let responseData;
                        if (res.ok) {
                            responseData = JSON.parse(res.text);
                        }
                        resolve(responseData.products);
                    });
            });
        }
        return promises.productsReady;
    },
    getProduct(id) {
        return new Promise((resolve, reject) => {
            request.get(`/api/products/${id ? id : 0}`)
                .end((err, res) => {
                    let responseData;
                    if (res.ok) {
                        responseData = JSON.parse(res.text);
                    }
                    resolve(responseData);
                });
        });
    },
    saveProduct(product) {
        return new Promise((resolve, reject) => {
            request.post(`/api/products`)
                .send(product)
                .end((err, res) => {
                    let responseData;
                    if (res.ok) {
                        responseData = JSON.parse(res.text);
                    }
                    resolve(responseData);
                });
        });
    },
    updateUser(user) {

    },
    deleteUser(id) {

    },
    clear(promiseName) {
        promises[promiseName] = null;
    }
};