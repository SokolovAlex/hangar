<users>
    <h3> Users </h3>

    <div class="row">
        <div class="col-md-6">
            <div class="form-group float-left">
                <input type="text" class="form-control">
                <i class="fa fa-search form-icon" aria-hidden="true"></i>
            </div>
        </div>
         <div class="col-md-6">
            <a class="btn float-right is-md" href="#user-details"> Add new </a>
        </div>
    </div>
    <div class="row">
        <table class="table margin-top-md">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Products</th>
                    <th>Active Products</th>
                    <th>Sum</th>
                    <th>Debt</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr each={ users }>
                    <td>{ name }</td>
                    <td>{ created }</td>
                    <td>{ productsAll }</td>
                    <td>{ activeProducts }</td>
                    <td>{ transactionsAll }</td>
                    <td>{ debt }</td>
                    <td>
                        <a class="table__action" href="#user-details/{id}"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                        <span class="table__action" onclick="{ deleteUser }"><i class="fa fa-trash" aria-hidden="true"></i></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <script>
        let tag = this;
        this.mixin('api');

        tag.users = tag.opts.users;
        tag.deleteUser = function(e) {
            let id = e.item.id;
            this.api.deleteUser(id).then(() => {

            });
        }
    </script>
</users>