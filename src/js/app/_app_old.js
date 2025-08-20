import Swiper from 'swiper';
import createDOM from './utils/createDOM.js';

const wait = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

class App {
    constructor(options) {
        this.DOM = createDOM();
        this.DOMParser = new DOMParser();
        this.init();
    }

    init = () => {
        const swiper = new Swiper(this.DOM.sliderOffer, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            // loopFillGroupWithBlank: false,
            speed: 600,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            pagination: {
              el: '.swiper-offer .swiper-custom-pagination',
              clickable: true,
              // dynamicBullets: true,
            },
        })

        console.log('swiper', swiper);


        document.addEventListener('click', e => {
            const nextCase = e.target.closest('[data-elt="nextCase"]');

            if (nextCase) {
                e.preventDefault();
                this.goNext(nextCase.getAttribute('href'));
                return; // ???
            }
        });

        document.addEventListener('mouseover', e => {
            const caseCard = e.target.closest('[data-elts="caseCard"]');
            console.log('caseCard', caseCard);
            if (caseCard) {
                caseCard.classList.add('is-active');
                this.DOM.projectTitleHover.classList.add('is-visible');
            }
        })

        document.addEventListener('mouseout', e => {
            const caseCard = e.target.closest('[data-elts="caseCard"]');

            if (caseCard) {
                caseCard.classList.remove('is-active');
                this.DOM.projectTitleHover.classList.remove('is-visible')
            }
        })


        this.DOM.caseCard && [...this.DOM.caseCard].map(cc => {
            console.log('cc', cc);
            cc.addEventListener('mouseenter', e => {
                this.DOM.projectTitleHover.classList.add('is-visible')
            });

            cc.addEventListener('mouseout', e => {
                this.DOM.projectTitleHover.classList.remove('is-visible')
            });
        })
    }

    stopWheel = (e) => {
        e.preventDefault()
        return false;
    }

    goNext = (url) => {
        console.log('load next');
        const scrollY = window.scrollY;
        const { top } = [...document.querySelectorAll('[data-elt="nextCase"]')].at(-1).getBoundingClientRect();

        window.scroll({
            top: scrollY + top - 232,
            behavior: 'smooth'
        })

        const nextSection = document.querySelector('[data-elt="nextSection"]');
        nextSection.classList.add('blackinvert');

        this.getPage(url);

        [...document.querySelectorAll(('[data-elts="gap"]'))].map(g => g.style.setProperty('width', 0));

        window.addEventListener('wheel', this.stopWheel, { passive: false });

        setTimeout(() => {
            console.log('enable');
            window.removeEventListener('wheel', this.stopWheel);
        }, 500);
    }

    getPage = async (url) => {
        const page = await fetch(url).then(r => r.text());
        const DOM = this.DOMParser.parseFromString(page, 'text/html');
        const content = DOM.querySelector('[data-elt="content"]');
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
        console.log('DOM', DOM);
    }
}




window.addEventListener('DOMContentLoaded', () => {
    console.log('app inited');

    new App();
})