export default class Accordion {
    setDefaultHeight = (el) => {
        let drop = el.querySelector('[data-elts ~= "accordionBox"]');
        if (!drop) return;
        let content = el.querySelector('[data-elts ~= "accordionContent"]'),
            defaultHeight = content.offsetHeight;

            drop.dataset.height = defaultHeight;

        if(!el.classList.contains('is-open')){
            drop.style.setProperty('height', `${0}px`);
        } else {
            drop.style.setProperty('height', `${defaultHeight}px`);
        }

        return el;
    }

    toggle = (el) => {
        let drop = el.querySelector('[data-elts ~= "accordionBox"]'),
            defaultHeight = drop.dataset.height;

        if(!el.classList.contains('is-open')){
            el.classList.add('is-open');
            drop.style.setProperty('height', `${defaultHeight}px`);
        } else {
            el.classList.remove('is-open');
            drop.style.setProperty('height', `${0}px`);
        }

        return false;
    }

    open = (el) => {
        let drop = el.querySelector('[data-elts ~= "accordionBox"]'),
            defaultHeight = drop.dataset.height;

        el.classList.add('is-open');
        drop.style.setProperty('height', `${defaultHeight}px`);

        return false;
    }

    close = (el) => {
        let drop = el.querySelector('[data-elts ~= "accordionBox"]');

        el.classList.remove('is-open');
        drop.style.setProperty('height', `${0}px`);

        return false;
    }
}
