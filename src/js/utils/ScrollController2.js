/*
Инициализируется один раз
Методы
1. Обновление скролла
2. Карта позиций переданных элементов на экране
*/

let instance;

export default class ScrollController2 {
	constructor(options = {}) {
		if (instance) return instance;
		else { instance = this; }

		this.options = {
			// elts: document.querySelectorAll('[data-scroll]'),
			events: {
				load: true,
				scroll: true,
				resize: true,
			},
			...options
		};

        // this.cb = cb || (() => {});

		this.height = options.height || window.innerHeight;
		// this.sections = options.sections|| this.getSectionsList();
		// this.newBounds = {};
		// this.sectionBounds = {};
		this.inited = false;
		this.elementBounds = {};

		this.init();

		// this.addEvents();
	}

	init = () => {
		this.updateScroll();
		// this.updateRects(this.scroll, window.innerHeight);
		// this.getSectionBounds(this.scroll, this.height);
	}

	addEvents = () => {
		this.options.events.load && window.addEventListener('load', this.onLoad);
		this.options.events.scroll && window.addEventListener('scroll', this.onScroll, { passive: true });
		this.options.events.resize && window.addEventListener('resize', this.onResize);
	}

	onLoad = (e) => {
		this.updateScroll();
		this.onResize();
		this.getSectionBounds(this.scroll, this.height);
		// this.cb(this.newBounds);
	}

	onScroll = (e) => {
		console.log('onScroll controller');
		/* this.updateScroll();
		this.getSectionBounds(this.scroll, this.height);
        this.cb(this.newBounds); */
	}

	onResize = (e) => {
		this.height = window.innerHeight;
		this.updateRects(this.scroll, this.height);
	}

	updateScroll = () => {
		this.scroll = window.scrollY;
	}

	getSectionsList = () => {
		const scrollSections = {};

		this.options.elts.forEach((item, i) => {
			scrollSections[item.dataset.scroll] = item;
		});

		return scrollSections;
	}

	updateRect = (item, windowHeight) => {
		const bounds = item.getBoundingClientRect();

		return {
			node: item,
			top: bounds.top - windowHeight,
			bottom: bounds.top + windowHeight,
			height: bounds.height
		};
	}

	updateRects = (sections) => {
		// console.log('this.options.sections', this.options.sections);

		const elementBounds = new Map();

		Object.entries(sections).forEach((item, i, arr) => {
			const
				name = item[0],
				node = item[1],
				bounds = node.getBoundingClientRect();

			elementBounds.set(name, {
				node,
				top: bounds.top - this.height + this.scroll,
				bottom: bounds.top + this.height,
				height: bounds.height
			});
		});

		return elementBounds;
	}

	getSectionBounds = (sections) => {
		if (!sections) {
			console.error('Target sections list required');
			return;
		}

		const newBounds = {};

		Object.entries(sections).forEach((item, i, arr) => {
			const
				key = item[0],
				// bounds = this.updateRect(item[1], windowHeight);
				bounds = this.elementBounds[key];

			if (!newBounds[key]) {
				newBounds[key] = {};
			}

			// Появление элемента снизу 0 - 1
			newBounds[key].in = (bounds.top - scroll) / -bounds.height;
			newBounds[key].inClamp = Math.max(0, Math.min(1, newBounds[key].in));

			// Появление элемента снизу 0 - 1 до тех пор, пока он не начнет уезжать
			// FXME: infinity
			newBounds[key].inFull = (bounds.top - scroll + windowHeight) / (-bounds.height + windowHeight);
			newBounds[key].inFullClamp = Math.max(0, Math.min(1, newBounds[key].inFull));

			// исчезновение элемента сверху 0 - 1
			newBounds[key].out = (bounds.top - scroll + windowHeight) / -bounds.height;
			newBounds[key].outClamp = Math.max(0, Math.min(1, (newBounds[key].out)));

			// появление элемента снизу 0 и исчезновение до косания верхней границы элемента верхнего края браузера 1
			newBounds[key].inOut = (bounds.top - scroll) / -(windowHeight + bounds.height);
			newBounds[key].inOutClamp = Math.max(0, Math.min(1, newBounds[key].inOut));

			// появление снизу 0 и касание верхней частью элемента края браузера 1
			newBounds[key].screen = (bounds.top - scroll) / -windowHeight;
			newBounds[key].screenClamp = Math.max(0, Math.min(1, newBounds[key].screen));

			newBounds[key].node = item[1];
		});

		return newBounds;
	}
}