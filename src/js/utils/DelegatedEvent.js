export default class DelegatedEvent {
	constructor(type) {
		this.events = [];
		document.addEventListener(type, this.delegatedEvent);
	}
	
	delegatedEvent = (event) => {
		// console.time('Delegated events check');
		
		this.events.forEach((e) => {
			const target = event.target.closest(e.selector);
			if (target) 
				e.cb(event, target);
		});

		// console.timeEnd('Delegated events check');
	}

	on = (selector, cb) => {
		this.events.push({
			selector,
			cb
		})
	}

	off = (selector) => {
		const index = this.events.findIndex((event) => {
			return event.selector === selector
		});

		this.events.splice(index, 1);
	}
}