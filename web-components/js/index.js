customElements.define('fancy-subscription-block', class extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('fancy-subscription-block-template');
        let content = template.content;
        const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(content.cloneNode(true));
    }
});
customElements.define('fancy-login-block', class extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('fancy-login-block-template');
        let content = template.content;
        const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(content.cloneNode(true));
    }
});
customElements.define('person-card', class extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('person-card-template');
        let content = template.content;
        const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(content.cloneNode(true));
    }
});
