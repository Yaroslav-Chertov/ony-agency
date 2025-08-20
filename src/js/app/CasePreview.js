/*
При инициализации привязываем поведение на ховер
При скролле устанавливаем видимость
На основе видимости устанавливаем класс и запускаем видео
*/

import { dqsa } from '../utils/DOM.js';
import throttle from '../utils/throttle.js';


class CasePreview {
    constructor() {
        this.state = {
            visibility: {},
            preload: {},
        };

        this.DOM = {
            videos: {},
            previews: {},
        };

        this.mouse = {
            x: 0,
            y: 0
        };

        this.width = window.innerWidth
        this.itemsTimeouts = {};

        this.init();
    }

    init = () => {
        const previews = dqsa('[data-elts~="casePreview"]');
        previews.map(p => {
            const key = p.dataset.key;
            const type = p.dataset.type;
            this.DOM.previews[key] = p;

            p.addEventListener('mouseenter', (e) => {
                this.showTitle(e.target);
            });

            p.addEventListener('mouseleave', (e) => {
                this.hideTitle(e.target);
            });
        });


        // TODO: remove events on unload

        const videos = dqsa('video[data-elts~="casePreviewMedia"]');
        videos?.map(v => {
            const key = v.closest('[data-key]').dataset.key
            this.DOM.videos[key] = v;
        });
    }

    onScroll = (e, elts) => {
        if (!elts) return;
        // Проверяем, виден ли элемент. Если виден, то обновляем ДОМ, запускаем видео
        // ВЫЧИСЛЯЕМ СОСТОЯНИЕ и после в RAF вызываем обновление ДОМ

        elts?.items.map((item) => {
            const isVisible = item.intersections.inOut > -0.1 && item.intersections.inOut < 1.1;
            this.toggleVisible(isVisible, item);

            const isPreload = item.intersections.inOut > -0.2;
            this.preload(isPreload, item);
        });

        // // WARN: зачем была нужна эта задержка? Троттлинг не очень работает, лучше дебаунс как сделано ниже
        // this.throttledScrollHover();

        this.hideTitle(this.currentTitle);

        clearTimeout(this.scrollHoverTM);
        this.scrollHoverTM = setTimeout(() => {
            this.scrollHover();
        }, 100);
    }

    scrollHover = () => {
        const hovered = document.elementFromPoint(this.mouse.x, this.mouse.y)?.closest('[data-elts="casePreview"]');

        /* if (this.currentTitle && hovered !== this.currentTitle) {
            this.hideTitle(this.currentTitle)
            return;
        } */

        if (hovered) {
            this.showTitle(hovered)
        }
    }

    throttledScrollHover = throttle(() => {
        const hovered = document.elementFromPoint(this.mouse.x, this.mouse.y)?.closest('[data-elts="casePreview"]');

        if (this.currentTitle && hovered !== this.currentTitle) {
            this.hideTitle(this.currentTitle)
            return;
        }

        if (hovered) {
            this.showTitle(hovered)
        }
    }, 20)

    onResize = (elts) => {
        this.width = window.innerWidth
        this.onScroll(elts)
    }

    toggleVisible = (isVisible, item) => {
        if (this.state[item.dataset.key] === isVisible) { return; }

        this.state[item.dataset.key] = isVisible;
        // TODO: update on RAF
        item.node.classList.toggle('is-visible', isVisible);
        this.DOM.videos[item.dataset.key]?.[isVisible ? 'play' : 'pause']();
        // this.DOM.videos[item.dataset.key]?.setAttribute('preload', isVisible ? 'auto' : 'none')
    }

    preload = (isPreload, item) => {
        if (!isPreload || this.state.preload[item.dataset.key] === isPreload) return;
        // this.DOM.videos[item.dataset.key]?.setAttribute('preload', 'auto');
        this.state.preload[item.dataset.key] = isPreload;
    }

    showTitle = (elt) => {
        if (elt === this.currentTitle) return;
        if (elt.dataset?.type === 'works') return; //TODO:
        if (this.width < 1024) return;

        this.currentTitle = elt;
        const { state, hoverTitle } = elt.dataset;

        Object.keys(this.DOM.previews).map((key, i) => {
            const item = this.DOM.previews[key];
            elt !== item && item.classList.add('is-hide');
        });

        if (this.itemsTimeouts[hoverTitle]) {
            clearTimeout(this.itemsTimeouts[hoverTitle]);
            elt.dataset.state = 3;
        }

        this.itemsTimeouts[hoverTitle] = setTimeout(() => {
            elt.dataset.state = 1;
        }, 100);
    }

    hideTitle = (elt) => {
        if (!elt) {
            elt = this.currentTitle;

            if (!elt) {
                return;
            }
        }

        if (elt.dataset?.type === 'works') return; //TODO:

        const { hoverTitle, state } = elt.dataset;

        Object.keys(this.DOM.previews).map((key, i) => {
            const item = this.DOM.previews[key];
            item.classList.remove('is-hide');
        });

        // if (state === '3') return;

        elt.dataset.state = 2;
        /* if (this.itemsTimeouts[hoverTitle]) {
            elt.dataset.state = 3;
            } */
        clearTimeout(this.itemsTimeouts[hoverTitle]);
        this.itemsTimeouts[hoverTitle] = setTimeout(() => {
            this.itemsTimeouts[hoverTitle] = null;
            elt.dataset.state = 0;
        }, 400);

        this.currentTitle = null;
    }

    resetState = () => {
        this.state = {
            visibility: {},
            preload: {},
        };
    }
}

export default CasePreview;