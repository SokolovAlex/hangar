<products>
    <h3> Products </h3>

    <div class="row">
        <div class="col-md-6">
            <div class="form-group float-left">
                <input type="text" class="form-control">
                <i class="fa fa-search form-icon" aria-hidden="true"></i>
            </div>
        </div>
         <div class="col-md-6">
            <a class="btn float-right is-md" href="#product-details"> Add new </a>
        </div>
    </div>
    <div class="row">
        <table class="table margin-top-md">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Cost</th>
                    <th>User</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr each={ products }>
                    <td>{ name }</td>
                    <td>{ type }</td>
                    <td>{ description }</td>
                    <td>{ created }</td>
                    <td>{ cost }</td>
                    <td>{ user.name }</td>
                    <td>
                        <a class="table__action" href="#product-details/{id}"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                        <span class="table__action" onclick="{ deleteProduct }"><i class="fa fa-trash" aria-hidden="true"></i></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <script>
        let tag = this;
        this.mixin('api');

        tag.products = tag.opts.products;
        tag.deleteProduct = function(e) {
            let id = e.item.id;
            this.api.deleteProduct(id).then(() => {
                debugger;
            });
        }
    </script>
</products>