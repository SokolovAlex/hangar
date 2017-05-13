module.exports = (router, app) => {

    var User = app.models.User;

    router.get('/users', (req, res) => {
        var body = req.body;
        var page = body.page || 1;
        var size = body.size || 20;
        var order = body.order || 'created';

        User.all({ limit: size, skip: (page - 1) * size, order: order }, (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            res.json({ users: result });
        });
    });

    router.get('/users/:id', (req, res) => {
        var id = req.params.id;

        if (!id) {
            return res.status(500).json({ message: "No id params" });
        }

        User.findOne({ where: { id } }, (err, user) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            res.json(user);
        });
    });

    router.post('/users', (req, res) => {
        var body = req.body;

        var dbUser = {

        };

        if (body.id) {
            User.find(body.id, (err, userModel) => {
                userModel.updateAttributes(dbUser, (err, result) => {
                    return res.json({ message: 'Success', user: result, type: 'update', error: false })
                });
            });
        } else {
            User.create(dbData, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.json({ message: 'Success', user: result, type: 'new', error: false })
            });
        }
    });

    router.delete('/users/:id', (req, res) => {
        var id = req.params.id;
        User.destroy(id, (err, userModel) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!userModel) return res.status(500).json({ error: "No user" });
            res.json({ error: false });
        });
    });

    return router;
};