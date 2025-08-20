/*
v1.0

new ScrollController();
*/

let instance;

export default class ScrollController {
	constructor(cb, options = {}) {
		if (instance) return instance;
		else { instance = this; }
		
		this.options = {
			elts: document.querySelectorAll('[data-scroll]'),
			events: {
				load: false,
				scroll: false,
				resize: false,
			},
			...options
		};

        this.cb = cb || (() => {});

		this.height = options.height || window.innerHeight;
		this.sections = options.sections;// || this.getSectionsList();
		console.log('this.sections', this.sections);
		this.newBounds = {};
		this.sectionBounds = {};
		this.inited = false;
		this.elementBounds = {};

		this.init();

		this.addEvents();
	}

	init = () => {
		this.updateScroll();
		this.updateRects(this.scroll, window.innerHeight);
		this.getSectionBounds(this.scroll, this.height);
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
		this.cb(this.newBounds);
	}

	onScroll = (e) => {
		this.updateScroll();
		this.getSectionBounds(this.scroll, this.height);
        this.cb(this.newBounds);
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

	updateRects = (scroll, windowHeight) => {
		// console.log('this.options.sections', this.options.sections);

		Object.entries(this.sections).forEach((item, i, arr) => {
			const
				name = item[0],
				node = item[1],
				bounds = node.getBoundingClientRect();

			this.elementBounds[name] = {
				node,
				top: bounds.top - windowHeight + scroll,
				bottom: bounds.top + windowHeight,
				height: bounds.height
			};
		});
	}

	getSectionBounds = (scroll, windowHeight) => {
		let height = windowHeight;

		// scroll = 0;

		if (!height) {
			height = this.height;
			console.error('Window height should be passed. Current height:', height);
		}
		
		Object.entries(this.sections).forEach((item, i, arr) => {
			const
				key = item[0],
				// bounds = this.updateRect(item[1], windowHeight);
				bounds = this.elementBounds[key];

			if (!this.newBounds[key]) {
				this.newBounds[key] = {};
			}

			// Появление элемента снизу 0 - 1
			this.newBounds[key].in = (bounds.top - scroll) / -bounds.height;
			this.newBounds[key].inClamp = Math.max(0, Math.min(1, this.newBounds[key].in));

			// Появление элемента снизу 0 - 1 до тех пор, пока он не начнет уезжать
			// FXME: infinity
			this.newBounds[key].inFull = (bounds.top - scroll + windowHeight) / (-bounds.height + windowHeight);
			this.newBounds[key].inFullClamp = Math.max(0, Math.min(1, this.newBounds[key].inFull));

			// исчезновение элемента сверху 0 - 1
			this.newBounds[key].out = (bounds.top - scroll + windowHeight) / -bounds.height;
			this.newBounds[key].outClamp = Math.max(0, Math.min(1, (this.newBounds[key].out)));

			// появление элемента снизу 0 и исчезновение до косания верхней границы элемента верхнего края браузера 1
			this.newBounds[key].inOut = (bounds.top - scroll) / -(windowHeight + bounds.height);
			this.newBounds[key].inOutClamp = Math.max(0, Math.min(1, this.newBounds[key].inOut));

			// появление снизу 0 и касание верхней частью элемента края браузера 1
			this.newBounds[key].screen = (bounds.top - scroll) / -windowHeight;
			this.newBounds[key].screenClamp = Math.max(0, Math.min(1, this.newBounds[key].screen));

			this.newBounds[key].node = item[1];
		});

		return this.newBounds;
	}
}