import DOMFactory from '../utils/DOM.js'

// TODO: наверно надо как-то нормально сделать, сейчас не очень удобная конфигурация
class Rotator {
    constructor(parameters) {
        this.DOM = DOMFactory();
        this.lastTime = 0;
        this.currentTime = 0;
        // this.maxItems = 8;

        this.timings = [
            [4, 0, 0],
            [6, 0, 0],
            [10, 0, 0],
            [2, 0, 0],
            [4, 0, 0],
            [6, 0, 0],
            [10, 0, 0],
            [8, 0, 0]
        ]
    }

    update = () => {
        this.DOM = DOMFactory(true);
        // console.log('this.DOM.rotator', this.DOM.rotator);
        if (!this.DOM.rotator) return;
        this.lastTime = 0;
    }

    render = (delta) => {
        if (!this.DOM.rotator || isNaN(delta)) return;
        this.currentTime += delta;

        if ((this.currentTime - this.lastTime) < 1000) return;
        this.lastTime = this.currentTime;

        const timeSlot = Math.floor(this.currentTime / 1000);// % this.maxItems;

        this.DOM.rotator.map((r, i) => {
            this.timings[i][1] = timeSlot % this.timings[i][0];

            if (this.timings[i][1]) return;

            this.timings[i][2]++
            r.style.setProperty('transform', `rotateX(${-this.timings[i][2] * 90}deg)`)
        })

    }
}

export {
    Rotator
}