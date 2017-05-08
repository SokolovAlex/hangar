<auth-menu>
    <nav class="menu { opened ? 'menu--open' :'' }">
        <span class="morph-shape" data-morph-active="M251,150c0,93.5-29.203,143-101,143S49,243.5,49,150C49,52.5,78.203,7,150,7S251,51.5,251,150z">
            <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none">
                <path d="M281,150c0,71.797-59.203,131-131,131S19,221.797,19,150S78.203,19,150,19S281,78.203,281,150z"></path><defs></defs></svg>
        </span>
        <button class="trigger" onclick={toggle}>
            <i class="fa fa-fw fa-share"></i>
        </button>
        <ul class="menu__items">
            <li>
                <a href="#"><i class="fa fa-fw fa-facebook"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-fw fa-rss"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-fw fa-vk"></i></a>
            </li>
            <li>
                <a href="/auth/google"><i class="fa fa-fw fa-google-plus"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-fw fa-twitter"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-fw fa-github"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-fw fa-pinterest"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-fw fa-envelope"></i></a>
            </li>
        </ul>
    </nav>

    <script>
        let tag = this;

        tag.opened = true;

        console.log('constructor');

        tag.toggle = () => {
           tag.opened = !tag.opened;
           tag.update();
        }
    </script>
</auth-menu>