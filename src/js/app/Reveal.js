import { DOM } from '../utils/DOM.js';
import ScrollController from '../utils/ScrollController.js';


class Reveal {
    constructor() {
        this.DOM = {};
        const scrollController = new ScrollController(this.intersect, {
            // sections: document.querySelectorAll('[data-scroll]')
        });

        // WARN: IntersectionObserver не срабатывает если быстро скроллить
    }

    intersect = (entries) => {
        Object.keys(entries).map((key, i) => {
            const item = entries[key];

            const isVisible = item.inOut > 0 && item.inOut < 1;
            if (item.node.dataset.param === 'video') {
                item.node.querySelector('video')[isVisible ? 'play' : 'pause']?.()
            }

            item.node.classList.toggle('is-visible', isVisible);
        });
    }
}

export default Reveal;