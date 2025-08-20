let instance;

// Для массива селектор data-elts, для одного элемента всегда data-elt
const DOMFactory = (options) => {
    let update = false;
    let one = '[data-elt]';
    let multiple = '[data-elts]';

    if (typeof options === 'boolean') {
        update = options;
    }

    if (Array.isArray(options)) {
        one = options[0];
        multiple = options[1];
    }

    if (!update && instance) return instance;
    const DOM = {};

    [...document.querySelectorAll(multiple)].forEach((elt, i) => {
        let arr = elt.dataset.elts.split(' ');

        arr.map((item) => {
            if (DOM[item]) {
                DOM[item].push(elt);
            } else {
                DOM[item] = [elt];
            }
        });
    });

    [...document.querySelectorAll(one)].forEach((elt, i) => {
        let arr = elt.dataset.elt.split(' ');

        arr.map((item) => {
            DOM[item] = elt;
        });
    });

    instance = DOM;

    return DOM;
}

class DomUtils {
	constructor(DOM, params) {
		this.DOM = DOM;
		this.DOMParser = new DOMParser();
	}

	parseFromString = (data, type = 'text/html') => {
		return this.DOMParser.parseFromString(data, type);
	}

	each = (name, fn) => {
		if (Array.isArray(this.DOM[name])) {
			return this.DOM[name].map(item => {
				return fn(item);
			})
		} else {
			return fn(this.DOM[name]);
		}
	}

	/**
	 * Set delegated event for target
	 * TODO: нужно добавлять все в один обработчик
	 * @param {string} 	 event - click, mouseenter, touchstart, etc
	 * @param {string} 	 elt - data-elt name of element
	 * @param {function} fn - callback function which will be called when event fired
	 * @param {object} 	 params - event params
	 */
	on = (event, elt, fn, params) => {
		document.addEventListener(event, (e) => {
			const target = e.target.closest?.(`[data-elt~="${elt}"]`);
			
			if (target) {
				fn(target, e)
			}
		}, params);
	}
}

const dqs = (selector) => document.querySelector(selector);
const dqsa = (selector) => [...document.querySelectorAll(selector)];
const qs = (scope, selector) => scope.querySelector(selector);
const qsa = (scope, selector) => [...scope.querySelectorAll(selector)];

const DOMUtils = new DomUtils();

export default DOMFactory;
export {
    DOMFactory,
	DOMUtils,
    dqs,
    dqsa,
    qs,
    qsa
};