let instance;

class HeaderToggle {
	constructor(header, {
		toggleClassName = 'is-active',
		offset = 80,
		minScroll = 150,
		mainOffset = 410
	} = {}) {
		if (instance) return instance;

		
		if (!header) {
			// console.error('No header DOM element provided');
			return false;
		}
		
		this.header = Array.isArray(header) ? header : [header];
		this.enabled = true;
		this.body = document.body;
		this.toggleClassName = toggleClassName;
		this.offset = offset;
		this.minScroll = minScroll;
		
		// If we need different actions on different pages
		/* this.mainFlag = this.body?.dataset.page == 'main';
		if (this.mainFlag) {
			this.offset = mainOffset;
		} */

		this.state = {
			headerVisible: false,
			headerPrevVisible: false,
			headerPrevScroll: 0,
		};

		instance = this;
	}

	toggle = (scroll, forceState) => {
		if (!this.enabled) {
			// this.updateHeaderState(false);
			return;
		}
		if (scroll < this.minScroll) {
			this.state.headerPrevVisible = true;
		}

		if (scroll - this.state.headerPrevScroll > this.offset) {
			this.state.headerPrevVisible = false;
			this.state.headerPrevScroll = scroll;
		}

		if (scroll - this.state.headerPrevScroll < -this.offset) {
			this.state.headerPrevVisible = true;
			this.state.headerPrevScroll = scroll;
		}

		if (this.state.headerVisible === this.state.headerPrevVisible && forceState === undefined) {
			return;
		}

		this.state.headerVisible = forceState !== undefined ? forceState : this.state.headerPrevVisible;

		this.updateHeaderState(this.state.headerVisible);

		return this.state.headerVisible;
	}

	updateHeaderState = (state) => {
		this.header.forEach((h) => {
			h.classList.toggle(this.toggleClassName, state);
			this.body.classList.toggle('is-header-visible', state);
		});
	}
}

export default HeaderToggle;