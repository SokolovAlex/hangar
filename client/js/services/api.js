const request = require('superagent');

let usersReady;

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
    updateUser(user) {

    },
    deleteUser(id) {

    }
};