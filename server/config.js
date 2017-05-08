module.exports = {
    mailTo: 's5sibir@yandex.ru',
    mailServer: {
        service: 'Gmail',
        auth: {
            user: 'ssibir.manager@gmail.com',
            pass: '*'
        }
    },
    auth: {
        google: {
            "clientID": "38351738227-9t5ngragsvni81koumdjov19j30u1ega.apps.googleusercontent.com",
            "clientSecret": "XZ_-HZHS7FxFSNfDizPkaumA",
            "callbackURL": "http://localhost:1111/auth/google/callback"
        },
        facebook: {

        },
        vk: {

        }
    },
    db_connect: {
        host: 'localhost',
        port: 3306,
        database: 'ssdb',
        username: "root",
        password: "Xx102030"
    },
    auth_cookie: 'x-auth'
};