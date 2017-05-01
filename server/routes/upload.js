var express = require('express');
var router = express.Router();
var UploadHelper = require('../helpers/uploadHelper');

module.exports = app => {

    var uploadHelper = UploadHelper(app);

    router.post('/product', function(req, res) {
        if (!req.files) {
            res.send('No files were uploaded.');
            return;
        }

        var image = req.files.tourImage;

        if (image) {
            uploadHelper.save(image, 'temp', () => {
                res.json({ message: '', error: false })
            });
        } else {
            res.json({ message: '', error: true })
        }
    });

    return router;
};