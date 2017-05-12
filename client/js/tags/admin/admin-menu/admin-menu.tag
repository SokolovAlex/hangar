<admin-menu>
   <nav class="codrops-demos margin-none">
        <a href="#products" class="{ activePage === Pages.products ? 'active' : ''}"> Products </a>
        <a href="#transactions" class="{ activePage === Pages.transactions ? 'active' : ''}"> Transactions </a>
        <a href="#users" class="{ activePage === Pages.users ? 'active' : ''}"> Users </a>
    </nav>

    <script>
        let options = this.opts;
        this.activePage = options.page;

        this.Pages = {
            products: 'products',
            transactions: 'transactions',
            users: 'users'
        };

        this.on('update', function(opts) {
            this.activePage = opts.page;
        });
    </script>
</admin-menu>