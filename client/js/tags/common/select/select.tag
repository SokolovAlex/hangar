<underscore-select>
    <div class="cs-select cs-skin-underline {opened ? 'cs-active' : ''}" onclick="{toggle}">
        <span class="cs-placeholder">{selected.text}</span>
        <div class="cs-options">
            <ul>
                <li each={type in types} onclick={select} class={ selected === type ? 'cs-selected' : ''}>
                    <span>{type.text}</span>
                </li>
            </ul>
        </div>
    </div>

    <script>
        let tag = this;
        tag.types = opts.types;
        tag.selected = opts.active;
        
        let onselect = opts.onselect;

        tag.opened = false;
        tag.toggle = () => {
            tag.opened = !tag.opened;
        };
        tag.select = (event) => {
            tag.selected = event.item.type;
            if(onselect) {
                onselect(tag.selected);
            }
        };
    </script>
</underscore-select>