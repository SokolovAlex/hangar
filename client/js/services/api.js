const request = require('superagent');

let usersReady,
    productsReady;

module.exports = {
    getUsers(filter) {
        if (!usersReady) {
            usersReady = new Promise((resolve, reject) => {
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
        return usersReady;
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
        if (!productsReady) {
            productsReady = new Promise((resolve, reject) => {
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
        return productsReady;
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
    updateUser(user) {

    },
    deleteUser(id) {

    }
};