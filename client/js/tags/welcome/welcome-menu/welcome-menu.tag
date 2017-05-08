<welcome-menu>
   <nav class="codrops-demos">
        <a href="#enter" class="{ activePage === Pages.enter ? 'active' : ''}"> Enter </a>
        <a href="#about" class="{ activePage === Pages.about ? 'active' : ''}"> About </a>
        <a href="#contacts" class="{ activePage === Pages.contacts ? 'active' : ''}"> Contacts </a>
    </nav>

    <script>
        let options = this.opts;
        this.activePage = options.page;

        this.Pages = {
            enter: 'enter',
            about: 'about',
            contacts: 'contacts'
        };

        this.on('update', function(opts) {
            this.activePage = opts.page;
        });
    </script>
</welcome-menu>