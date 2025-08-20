import { Pane } from 'tweakpane';
import wait from './wait.js';

class DebugTools {
    constructor() {
        this.body = document.body;
        this.pane = new Pane({
            title: 'Debug panel',
            container: document.querySelector('.debug-panel'),
        });

        this.state = {};
        this.loadState();
        this.applyState();

        this.pane.addButton({
            title: 'Toggle',
            label: 'Grid',   // optional
        }).on('click', () => {
            this.toggleGrid();
            this.saveState();
        });

        this.pane.addButton({
            title: 'Open',
            label: 'Sitemap',   // optional
        }).on('click', () => {
            const url = '/sitemap';
            // location.assign(url);
            window.open(url, '_blank');
        });

        this.pane.addButton({
            title: 'Clear all API cache',
            label: 'Cache',
        }).on('click', async (elt) => {
            const url = '/api/clear-cache?key=devclear';
            const t = elt.target;
            t.disabled = true;
            await wait(500);
            const r = await fetch(url).then(r => r.json())
            t.title = r.message;

        });
    }

    renderState = () => {

    }

    saveState = () => {
        this.state.panel = this.pane.exportState(this.state.panel);
        localStorage.setItem('debugState', JSON.stringify(this.state));
    }

    loadState = () => {
        let state = JSON.parse(localStorage.getItem('debugState')) || {};
        state.panel && this.pane.importState(state.panel);
        this.state = state;

        return this.state;
    }

    applyState = () => {
        this.toggleGrid(this.state.grid ?? false);
    }

    toggleGrid = (newState) => {
        const state = this.body.classList.toggle('is-debug-grid', newState);

        this.state.grid = state;
        return state;
    }

}

export default new DebugTools();