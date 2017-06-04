const fs = require("fs");
const _ = require("lodash");
const enums = require('../enums');
const ImageTypesFolders = enums.ImageTypes;

module.exports = (app) => {
    const Image = app.models.Image;

    function getRandomInt() {
        return parseInt(Math.random() * 1000, 10);
    }

    const addNum = (name) => {
        var fields = name.split('.');
        return [fields[0] + '_' + getRandomInt(), fields[1]].join('.');
    };

    const removeFile = (name, folder) => {
        fs.unlink(`${app.upload_path}${folder}/${name}`, _.noop);
    };

    const remove = (id, next) => {
        if (!id) {
            return next(null);
        }

        Image.find(id, (err, model) => {
            if (!model) {
                console.log(`no model with id ${id}`);
                return next(err);
            }

            let type = model.productId ? ImageTypesFolders.Products : ImageTypesFolders.Transactions;
            removeFile(model.name, type);
            model.destroy(next);
        });
    };

    const update = (id, file, type, next) => {
        var folder = ImageTypesFolders[type];

        Image.find(id, (err, model) => {
            if (err || !model) {
                return next(err);
            }

            if (model.name != file.name) {
                removeFile(model.name, folder);
            }

            var name = addNum(file.name);

            file.mv(app.upload_path + `${folder}/${name}`, _.noop);

            model.updateAttributes({
                name: name
            }, next);
        });
    };

    function create(file, type, options, next) {

        if (!file) {
            return next(null);
        }

        if (_.isFunction(options)) {
            next = options;
        }

        options = options || {};

        let folder = ImageTypesFolders[type];

        let name = addNum(file.name);

        const saveDb = new Promise((resolve) => {
            Image.create({
                name: name,
                description: options.description,
                productId: options.productId,
                type
            }, (err, result) => {
                if (err) return next(err);

                resolve(result);
            });
        });

        return saveDb.then((result) => {
            file.mv(app.upload_path + `${folder}/${name}`, function(err) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    next(null, result);
                }
            });
        }).catch(function(err) {
            console.log(err);
            next(err);
        });
    }

    function save(id, file, type, next) {
        if (!id) {
            create(file, type, next);
        } else {
            if (file) {
                update(id, file, type, next);
            } else {
                next(null, null)
            }
        }
    }

    function saveFile(file, folder, next) {
        file.mv(app.upload_path + `${folder}/${file.name}`, next);
    }

    return {
        create,
        save,
        remove
    };
};