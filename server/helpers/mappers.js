const _ = require("lodash");
const moment = require("moment");

const mapImage = (image) => {
    image.src = `/upload/Products/${image.name}`;
    return image;
}

module.exports = {

    images(err, images) {
        if (err) return [];
        return images.map(mapImage);
    },

    image(image) {
        return mapImage(image);
    },

    product(product) {
        let created = product.created;
        product.createdString = moment(created).format("LLLL");
        return product;
    }
};