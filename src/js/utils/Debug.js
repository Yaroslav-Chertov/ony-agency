let instance;

class Debug {
    constructor() {
        if (instance) return instance;
        this.inited = false;
        this.enabled = false;
        this.readStorage();
        this.addEvents();
    }

    readStorage = () => {
        const enabled = localStorage.getItem('debugEnabled');
        if (enabled === '1') this.init();
    }

    init = async () => {
        if (this.inited) return;

        this.DOM = {
            body: document.body
        }

        this.tools = (await import('./DebugTools.js')).default;

        this.enable();
        this.inited = true;
    }

    enable = async () => {
        if (!this.inited) await this.init();

        localStorage.setItem('debugEnabled', 1);
        this.enabled = true;
        this.DOM.body.classList.add('is-debug');
    }

    close = () => {
        localStorage.setItem('debugEnabled', 0);
        this.enabled = false;
        this.DOM.body.classList.remove('is-debug');
    }

    toggle = () => {
        if (this.enabled) {
            this.close()
        } else {
            this.enable();
        }
    }

    addEvents = () => {
        window.addEventListener('keydown', this.handleKeypress);
    }

    handleKeypress = (e) => {
        if (e.altKey && e.shiftKey && (e.ctrlKey || e.metaKey) && e.code === 'KeyD') {
            this.toggle();
        }
    }
}

export default Debug;