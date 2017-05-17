<product-details>
    <h3> { product.id ? 'Edit Prodduct' : 'New Product'} </h3>

    <div class="row margin-bottom-xs">
        <div class="col-md-4">Name</div>
        <div class="col-md-4">
            <input type='text' value={ product.name }/>
        </div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-4">Description</div>
        <div class="col-md-4">
            <input type='text' value={ product.description }/>
        </div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-4">Cost</div>
        <div class="col-md-4">
            <input type='text' value={ product.cost }/>
        </div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-4">Type</div>
        <div class="col-md-4">
            <underscore-select 
                active={defaultType}
                types={types}>
            </underscore-select>
        </div>
    </div>

    <div class="row margin-bottom-xs">
        <div class="col-md-4">
            <button class="btn" onclick={save}> Save </button>
        </div>
    </div>

    <script>
        let tag = this;
        tag.product = this.opts.product || {};
        tag.types = this.opts.types || {};
        tag.defaultType = tag.types.none;

        tag.save = () => {
            let select = tag.tags['underscore-select'];

            
            debugger;
        }

    </script>

</product-details>