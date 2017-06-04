var express = require('express');
var router = express.Router();
var UploadHelper = require('../helpers/uploadHelper');
var ImageTypes = require('../enums').ImageTypes;
var mapper = require('../helpers/mappers');

module.exports = app => {

    var uploadHelper = UploadHelper(app);

    router.post('/', function(req, res) {
        if (!req.files) {
            res.send('No files were uploaded.');
            return;
        }

        let image = req.files.image,
            productId = req.body.productId;

        if (image) {
            uploadHelper.create(image, ImageTypes.Products, { productId }, (err, model) => {
                res.json({ message: '', error: false, image: mapper.image(model) })
            });
        } else {
            res.json({ message: '', error: true })
        }
    });

    router.delete('/:id', function(req, res) {
        let id = req.params.id;

        uploadHelper.remove(id, () => {

            res.json({ message: '', error: false })
        })
    });

    return router;
};