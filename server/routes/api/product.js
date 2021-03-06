const enums = require('../../enums');
const mappers = require('../../helpers/mappers');

module.exports = (router, app) => {

    var Product = app.models.Product;

    router.get('/products', (req, res) => {
        var body = req.body;
        var page = body.page || 1;
        var size = body.size || 20;
        var order = body.order || 'created';

        Product.all({ limit: size, skip: (page - 1) * size, order: order, include: ['user'] }, (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            res.json({ products: result });
        });
    });

    router.get('/products/:id', (req, res) => {
        let id = req.params.id;

        if (!id) {
            return res.json({ types: enums.ProductTypes });
        }

        Product.findOne({ where: { id }, include: ['user', 'images'] }, (err, product) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            product.images(mappers.images);

            product = mappers.product(product);

            res.json({ product, types: enums.ProductTypes });
        });
    });

    router.post('/products', (req, res) => {
        let body = req.body;

        let dbEntity = {
            description: body.description,
            name: body.name,
            cost: body.cost,
            type: body.typeId
        };

        if (body.id) {
            Product.find(body.id, (err, productModel) => {
                if (err) return res.status(500).json({ error: err.message });

                productModel.updateAttributes(dbEntity, (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });

                    return res.json({ message: 'Success', product: result, type: 'update', error: false })
                });
            });
        } else {
            dbEntity.userId = req.user.id;
            Product.create(dbEntity, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });

                return res.json({ message: 'Success', product: result, type: 'new', error: false })
            });
        }
    });

    router.delete('/products/:id', (req, res) => {
        var id = req.params.id;
        Product.destroy(id, (err, productModel) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!productModel) return res.status(500).json({ error: "No product" });
            res.json({ error: false });
        });
    });

    return router;
};