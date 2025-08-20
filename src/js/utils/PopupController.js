import DOMFactory from './DOM';
import { overflow } from './overflow.js';

class PopupController {
    constructor() {
        this.DOM = DOMFactory()
        this.opened = false;
        this.addEvents()
    }

    addEvents = () => {
        window.addEventListener('keyup', (e) => {
            if (e.code === 'Escape') {
                this.close();
            }
        })
    }

    open = (id) => {
        this.DOM.popup?.map(popup => {
            popup.classList.toggle('is-open', popup.dataset.popup === id)
            if (popup.dataset.popup === id) {
                this.opened = true;
            }
        })

        overflow.on();
    }

    close = () => {
        this.DOM.popup?.map(popup => popup.classList.remove('is-open'))
        this.opened = false;

        overflow.off();
    }
}

export default PopupController;