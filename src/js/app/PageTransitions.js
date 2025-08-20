// import morphdom from 'morphdom';
// import Idiomorph from 'idiomorph/dist/idiomorph.cjs.js';
import { DOMFactory, DOMUtils } from '../utils/DOM.js';
import { scrollToAnim } from '../utils/scrollTo.js';
import HeaderToggle from './HeaderToggle.js';

const wait = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


const loadPage = async (url) => {
    const page = await fetch(url).then(r => r.text());
    const DOM = DOMUtils.parseFromString(page, 'text/html');

    return {
        DOM,
        transitionIntro: DOM.querySelector('[data-elt="transitionIntro"]'),
        transitionContent: DOM.querySelector('[data-elt="transitionContent"]'),
        transitionNext: DOM.querySelector('[data-elt="transitionNext"]'),
    }

    /* const content = DOM.querySelector('[data-elt="content"]');
    const footerClass = DOM.querySelector('footer')?.classList?.value;
    console.dir(footerClass);
    console.log('content', content);


    await wait(500)
    // this.DOM.content = content;
    document.querySelector('[data-elt="content"]').remove();
    const nexts = [...document.querySelectorAll('[data-elt="nextSection"]')]
    nexts.at(-1).after(content);
    nexts.at(-1).style.setProperty('max-height', (nexts.at(-1).querySelector('video').offsetHeight + 232) + 'px');

    const next = DOM.querySelector('[data-elt="nextSection"]');
    console.log('next', next);
    document.querySelector('[data-elt="content"]').after(next);

    setTimeout(() => {
        nexts.length > 1 && nexts.at(0).remove();
        if (footerClass) {
            document.querySelector('footer').classList.value = footerClass;
        }
    }, 500);

    console.log('content', content);
    console.log('DOM', DOM); */
}


export default class PageTransitions {
    constructor(cb) {
        this.cb = cb || (() => {});
        this.DOM = DOMFactory();
        /* DOMUtils.on('click', 'goNextPage', (target, e) => {
            e.preventDefault();
            this.setPage(target.href);
        }); */

        this.count = 0;
        this.headerToggle = new HeaderToggle();
        this.loaded = false;
    }

    lockedWheel = (e) => {
        // TODO: выключать тач на мобилке?
        e.preventDefault()
        return false;
    }

    disableWheel = (e) => {
        // console.log('disableWheel');
        window.addEventListener('wheel', this.lockedWheel, { passive: false });
    }

    enableWheel = () => {
        // console.log('enableWheel');
        window.removeEventListener('wheel', this.lockedWheel, { passive: false });
    }

    scrollForLoading = () => {
        const scrollY = window.scrollY;
        const { top } = this.DOM.transitionNext.getBoundingClientRect();
        const headerHeight = this.DOM.header.getBoundingClientRect().height;
        const distance = top - headerHeight + 1;

        /* scrollToAnim({
            // top: scrollY + distance,
            scroll: scrollY,
            distance,
            time: 400
        }); */

        window.scroll({
            top: scrollY + distance,
            behavior: 'smooth'
        });
    }

    deleteContent = () => {
        this.DOM.transitionContent?.remove();
    }

    updateClasses = (target, source) => {
        if (source?.className) {
            target.className = source.className;
        }
    }

    updateAttributes = (target, source) => {
        target.dataset.elt = 'transitionIntro';
    }

    loading = (state) => {
        const loaderTimeout = setTimeout(() => {
            if (!this.loaded) document.body.classList.add('is-header-loader');
        }, 1000);

        // TODO: шапка должна прятаться после начала загрузки, сейчас не прячется
        // console.log('loading state', state, this.headerToggle.enabled);
        // state && this.headerToggle.updateHeaderState(state);
        // this.headerToggle.enabled = !state;

        if (!state) {
            this.loaded = true;
            clearTimeout(loaderTimeout);
            document.body.classList.remove('is-header-loader');
            this.headerToggle.enabled = true;
        }
    }

    setPage = async (url) => {
        history.replaceState({ pageTransition: true }, null, location.href);
        history.pushState({ pageTransition: true }, null, url);
        this.headerToggle.updateHeaderState(true);
        this.headerToggle.enabled = false;
        
        this.setHeight();

        this.loading(true);
        this.disableWheel();
        this.scrollForLoading();
        const page = await loadPage(url);
        // await wait(2500); //test

        this.updateClasses(this.DOM.transitionNext, page.transitionIntro);
        const headerClasses = page.DOM.querySelector('[data-elt="header"]').className;
        this.DOM.header.className = headerClasses;
        page.DOM.body.className.split(' ').map(c => {
            if (c === 'is-loading' || !c) return;
            document.body.classList.add(c);
        })

        await wait(1000);
        console.time('morph custom');
        this.DOM.transitionIntro?.remove();
        this.DOM.transitionContent?.remove();
        const footerClasses = page.DOM.querySelector('[data-elt="footer"]')?.className;

        if (this.DOM.footer) {
            this.DOM.footer.className = footerClasses;
        }
        this.DOM.transitionNext.dataset.elt = 'transitionIntro';
        this.DOM.pageContainer.append(page.transitionContent);
        this.DOM.pageContainer.append(page.transitionNext);
        // TODO: проверить обновление DOM
        this.DOM.goNextPage.style.removeProperty('height');
        this.DOM = DOMFactory(true);
        this.cb();
        this.enableWheel();

        // await wait(500);
        this.loading(false);

        this.headerToggle.enabled = true;

        console.timeEnd('morph custom');
        // updateCache();
    }

    setHeight = () => {
        const { height } = this.DOM.goNextPage.getBoundingClientRect();
        const offsetTop = this.DOM.goNextPage.offsetTop;
        const y = window.scrollY;
        const off = height + (offsetTop - y);

        if (off < 0) return;

        this.DOM.goNextPage.style.setProperty('height', `${height + off}px`)
    }
}

