<app>
    <style scoped>
    </style>

    <nav class="codrops-demos">
        <a href="#enter" class="{ activeTab === Tabs.enter ? 'active' : ''}"> Enter </a>
        <a href="#about" class="{ activeTab === Tabs.about ? 'active' : ''}"> About </a>
        <a href="#contacts" class="{ activeTab === Tabs.contacts ? 'active' : ''}"> Contacts </a>
    </nav>
    
    <div class="content">
        <div class="menu-content" if="{activeTab === Tabs.enter}">
            auth-menu
            <auth-menu></auth-menu>
        </div>
        <div class="menu-content" if="{activeTab === Tabs.about}">
            about us
        </div>
        <div class="menu-content" if="{activeTab === Tabs.contacts}">
            my number
        </div>
    </div>

    <script>
        let options = this.opts;
        this.activeTab = options.tab;

        this.Tabs = {
            enter: 'enter',
            about: 'about',
            contacts: 'contacts'
        };

        this.on('update', function(opts) {
            this.activeTab = opts.tab;
        });
    </script>
</app>