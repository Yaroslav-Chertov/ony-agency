export let overflow = {
	elements : document.querySelectorAll('body'),

	on: () => {
		const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

		if(scrollWidth > 0){
			document.querySelector('[data-elt ~= "body"]').classList.add('is-fake-scroll');
			overflow.elements.forEach((el) => {
				el.style.setProperty('padding-right', `${scrollWidth}px`);
			});
		}

		document.querySelector('[data-elt ~= "body"]').classList.add('is-overflow');
	},
	off: () => {
		if (document.querySelector('[data-elt ~= "body"]').classList.contains('is-fake-scroll')) {
			document.querySelector('[data-elt ~= "body"]').classList.remove('is-fake-scroll');

			overflow.elements.forEach((el) => {
				console.log('el', el);
				el.style.removeProperty('padding-right');
			});
		}

		document.querySelector('[data-elt ~= "body"]').classList.remove('is-overflow');
	}
}
