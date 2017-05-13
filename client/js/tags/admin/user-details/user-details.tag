<user-details>
    <h3> User Details </h3>

    <div class="margin-bottom-md">
        <img class="user__avatar" src={user.avatar}></img>
    </div>

    <div class="row margin-bottom-xs">
        <div class="col-md-4">Name</div>
        <div class="col-md-4">{user.name}</div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-4">Email</div>
        <div class="col-md-4">{user.email}</div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-4">Modified</div>
        <div class="col-md-4">{user.modified}</div>
    </div>
    <div class="row margin-bottom-xs">
        <div class="col-md-4">Created</div>
        <div class="col-md-4">{user.created}</div>
    </div>
     <div class="row margin-bottom-xs">
        <div class="col-md-4">Transactions</div>
        <div class="col-md-4">---</div>
    </div>
     <div class="row margin-bottom-xs">
        <div class="col-md-4">Products</div>
        <div class="col-md-4">---</div>
    </div>

    <script>
        let tag = this;
        tag.user = this.opts.user || {};
    </script>

</user-details>