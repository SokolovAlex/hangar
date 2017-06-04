<product-details>
    <h3> { product.id ? 'Edit Product' : 'New Product'} </h3>

    <div class="row margin-bottom-xs">
        <div class="col-md-3 col-md-offset-2">Name</div>
        <div class="col-md-4">
            <input type='text' value={ product.name } onblur={ sync.bind(null, product, 'name') }/>
        </div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-3 col-md-offset-2">Description</div>
        <div class="col-md-4">
            <input type='text' value={ product.description } onblur={ sync.bind(null, product, 'description') } />
        </div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-3 col-md-offset-2">Cost</div>
        <div class="col-md-4">
            <input type='number' value={ product.cost } onblur={ sync.bind(null, product, 'cost') }/>
        </div>
    </div>
    <div class="row margin-bottom-xs" if={ product.user }>
        <div class="col-md-3 col-md-offset-2">Creator</div>
        <div class="col-md-4"> { product.user.name } </div>
    </div>
    <div class="row margin-bottom-xs" if={ product.created }>
        <div class="col-md-3 col-md-offset-2">Created</div>
        <div class="col-md-4"> { product.createdString } </div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-3 col-md-offset-2">Type</div>
        <div class="col-md-4">
            <underscore-select 
                active={ defaultType }
                types={ types }>
            </underscore-select>
        </div>
    </div>

    <div class="row margin-bottom-xs">
        <div class="col-md-3 col-md-offset-2">
            <form id="upload__form">
                <div class="margin-bottom-xs">
                    <input type="file" name="image" onchange={changeImage} />
                </div>
                <button class="btn" onclick={ upload }> upload </button>
            </form>
        </div>
        <div class="col-md-5" if={previewUrl}>
            <img alt="" class="preview" src="{previewUrl}">
        </div>
    </div>

     <div class="row margin-bottom-xs">
        <div class="col-md-3 col-md-offset-2">
            Images
        </div>
        <div class="col-md-5">
            <div class="product_image-wrapper" each={ image in product.images } >
                <span class="product_image-close" onclick={ deleteImage }>X</span>
                <img alt="product" class="product_image" src="{ image.src }">
            </div>
        </div>
    </div>

    <div class="row margin-bottom-xs">
        <div class="col-md-3 col-md-offset-2">
            <button class="btn" onclick={ save }> Save </button>
        </div>
    </div>

    <script>
        let tag = this;
        tag.mixin('api');
        tag.mixin('route');
        tag.mixin('sync');

        tag.product = tag.opts.product || { isNew: true };
        tag.types = tag.opts.types || {};

        tag.defaultType = tag.product.isNew ? tag.types.none
            : _.find(tag.types, (type) => {
                return type.id === tag.product.type
            });

        tag.save = () => {
            let selectTag = tag.tags['underscore-select'];
            tag.product.typeId = selectTag.selected.id;

            tag.api.saveProduct(tag.product).then((responce) => {
                tag.api.clear('productsReady');
                tag.route("products")
            });
        }

        tag.deleteImage = (event) => {
            let id = event.item.image.id;
            tag.api.deleteImage(id).then((data) => {
                tag.product.images = _.filter(tag.product.images, (item) => {
                    return item.id !== id;
                });
                tag.update({ product: tag.product });
            });
        }

        tag.changeImage = (event) => {
            let uploadEl = event.srcElement;
            if(uploadEl.files.length) {
                let selectedFile = uploadEl.files[0];
                tag.previewUrl = URL.createObjectURL(selectedFile);
            }
        };

        tag.upload = (event) => {
            event.preventDefault()

            let formElement = document.getElementById('upload__form');
            let formData = new FormData(formElement);

            let request = new XMLHttpRequest();
            request.open("POST", "upload", true);

            formData.append('productId', tag.product.id);

            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            request.send(formData);

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    let responseData = JSON.parse(request.responseText);
                    console.log(responseData);
                    if (responseData && !responseData.error) {
                        tag.product.images.push(responseData.image);
                        tag.update({ product: tag.product, previewUrl: '' });
                    }
                }
            };
        };
    </script>

</product-details>