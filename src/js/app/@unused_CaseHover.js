class CaseHover {
    constructor(links, target) {
        if (!links) {
            return;
        }

        this.links = links;
        this.target = target;
        this.currentTitle = null;

        this.itemsTimeouts = {};
    }
    // TODO: поправить глюки при быстром ховере
    showTitle = (elt) => {
        this.currentTitle = elt;
        console.log('asdasdasdsd');
        const { state, hoverTitle } = elt.dataset;

        this.links.map(l => elt !== l && l.classList.add('is-hide'))

        if (this.itemsTimeouts[hoverTitle]) {
            clearTimeout(this.itemsTimeouts[hoverTitle]);
            elt.dataset.state = 3;
        }

        this.itemsTimeouts[hoverTitle] = setTimeout(() => {
            elt.dataset.state = 1;
        }, 100);
    }

    hideTitle = (elt) => {
        if (!elt) {
            elt = this.currentTitle;

            if (!elt) {
                return;
            }
        }

        const { hoverTitle, state } = elt.dataset;

        this.links.map(l => l.classList.remove('is-hide'))

        // if (state === '3') return;

        elt.dataset.state = 2;
        /* if (this.itemsTimeouts[hoverTitle]) {
            elt.dataset.state = 3;
            } */
        clearTimeout(this.itemsTimeouts[hoverTitle]);
        this.itemsTimeouts[hoverTitle] = setTimeout(() => {
            this.itemsTimeouts[hoverTitle] = null;
            elt.dataset.state = 0;
        }, 600);
    }
}

export default CaseHover;