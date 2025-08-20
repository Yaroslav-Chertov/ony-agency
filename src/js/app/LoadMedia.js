class LoadMedia {
    constructor() {
        // console.log('LoadMedia inited');
        // this.state для кеширование состояния, чтобы не "запускать" видео несколько раз и не обращаться к ДОМ без необходимости
        this.reset();
    }

    load = (section) => {
        if (!section) return;
        // console.log('this.state', this.state.video);
        // console.time('Check load');
        section.items.map((item, i) => {
            const isVisible = item.intersections.inOut > -0.3 && item.intersections.inOut < 1.1;

            if (item.node.tagName === 'VIDEO' && this.state.video[i] !== isVisible) {
                // TODO: обрабатывать play pause промисами
                if (isVisible) {
                    item.node.play().then((e) => {
                        // console.log('play event', item.node);
                    }).catch((e) => {
                        // console.log('e', e);
                    });
                } else {
                    item.node.pause();
                }

                // item.node.setAttribute('preload', isVisible ? 'auto' : 'none')
                this.state.video[i] = isVisible;

                return;
            }

            if (item.node.tagName === 'IMG' && isVisible && !this.state.img[i]) {
                item.node.src = item.dataset.src;
                this.state.img[i] = isVisible;
            }
        })
        // console.timeEnd('Check load');
    }

    reset = () => {
        this.state = {
            video: {},
            img: {}
        };
    }
}

export default LoadMedia;