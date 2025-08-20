/*
Example use:
1. Init Smart Progress
const smartProgress = new SmartProgress();

2. Add tweens with name, min and max values
smartProgress.add('scroll', 0, 1);

3. Update added progress values whenever you want
smartProgress.updateProgress('scroll', 0.3);

4. Update delta for every frame, when animation started
delta = ~16ms per frame on 60 fps mode
smartProgress.updateDelta(delta);

5. Get progress values on each frame
smartProgress.getProgress('scroll');
*/

/*
Loop example

init = () => {
	this.lastTime = 0;
	this.loop(0); // run loop
}

update = (delta) => {
	smartProgress.updateDelta(delta);
	const value = smartProgress.getProgress('scroll'); // set value here
	console.log(value);
}

loop = (time) => {
	requestAnimationFrame(this.loop);

	const delta = time - this.lastTime;

	this.update(delta);

	this.lastTime = time;
}
*/

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

export default class SmartProgress {
	constructor(options = {}) {
		this.options = options;
		this.options.speed = this.options.speed || 0.05;
		this.tweens = {};
	}

	add = (name, min, max, bump) => {
		if (this.tweens[name]) {
			console.error('Tween', name, 'already exists');
		}

		this.tweens[name] = {
			instant: 0,
			smooth: 0,
			bump: bump || max / 1000,
			min,
			max
		}
	}

	update = (name, min, max, bump) => {
		if (!this.tweens[name]) {
			console.error('Tween', name, 'is not exists');
		}

		this.tweens[name] = {
			instant: this.tweens[name].instant,
			smooth: this.tweens[name].smooth,
			bump: bump || max / 1000,
			min,
			max
		}
	}

	updateProgress = (name, value) => {
		const tween = this.tweens[name];
		this.tweens[name].instant = clamp(value, tween.min, tween.max);
	}

	updateDelta = (delta) => {
		Object.keys(this.tweens).map((name, i) => {
			const
				tween = this.tweens[name];

			let increaseValue = 0;
			let progressDiff = tween.instant - tween.smooth;

			if (tween.smooth != tween.instant) {
				increaseValue = progressDiff * this.options.speed;
				tween.smooth += increaseValue;
			}

			if (Math.abs(progressDiff) < tween.bump) {
				tween.smooth = tween.instant;
			}
		});
	}

	getProgress = (name) => {
		if (!this.tweens[name]) {
			return 0;
		}

		return this.tweens[name].smooth;
	}
}
