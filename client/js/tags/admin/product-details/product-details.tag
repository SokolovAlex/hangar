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

            tag.api.saveProduct(tag.product).then( (responce) => {
                tag.api.clear('productsReady');
                tag.route("products")
            });
        }
    </script>

</product-details>