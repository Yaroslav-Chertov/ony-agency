import DOMFactory from '../utils/DOM.js';
import getQuery from '../utils/getQuery.js';

/* TODO: при переключении между фильтрами не срабатывает is-visible на кейсах */

const directionValues = {
    'new': 'Новое',
    'branding': 'Брендинг',
    'digital': 'Digital-решения',
    'strategy': 'Стратегии',

    'Новое': 'new',
    'Брендинг': 'branding',
    'Digital-решения': 'digital',
    'Стратегии': 'strategy',
};

class WorkFilter {
    constructor(parameters) {
        this.defaultFilterText = 'Фильтры';
        this.init();
    }

    init = () => {
        this.DOM = DOMFactory();

        if (!this.DOM.workFilterItems) return;

        this.selectedDirection = null;
        this.selectedFilter = null;

        this.filterEltsMap = {};

        this.DOM.workFilterItems.map(elt => {
            const tags = elt.dataset.tags.split(',');
            tags.map(t => {
                if (!this.filterEltsMap[t]) {
                    this.filterEltsMap[t] = [];
                }

                this.filterEltsMap[t].push(elt);
            })
        });
    }

    setFilter = (filter, updateHistory = true) => {
        if (this.selectedFilter && this.selectedFilter === filter) {
            this.selectedFilter = false;
        } else {
            this.selectedFilter = filter; //this.selectedFilter === filter ? false : filter;
        }

        if (updateHistory) {
            if (this.selectedFilter) {
                    history.pushState({ type: 'work' }, null, '?filter=' + filter);
            } else {
                if (location.search) {
                    history.pushState({ type: 'work' }, null, location.origin + location.pathname);
                }
            }
        }

        this.render();
    }

    setFilterDirection = (direction) => {
        if (this.selectedDirection && this.selectedDirection === direction) {
            this.selectedDirection = false;
            history.pushState({ type: 'work' }, null, location.origin + location.pathname);
        } else {
            this.selectedDirection = direction;
            history.pushState({ type: 'work' }, null, '?' + directionValues[this.selectedDirection]);
        }

        this.render();
    }

    search = (tags, direction, filter) => {
        let isVisible = false;

        if (!direction && !filter) { // без фильтров показать все
            isVisible = true;
        }

        if (!direction && filter) { // если Новое (без фильтра) и указан фильтр
            isVisible = tags.includes(filter);
        }

        if (direction && !filter) { // только Направление выбрано
            isVisible = tags.includes(direction);
        }

        if (direction && filter) { // только Направление выбрано
            isVisible = tags.includes(direction) && tags.includes(filter);
        }

        return isVisible;
    }

    render = () => {
        if (!this.DOM.workFilterItems || !this.DOM.setWorkDirection) return;

        this.DOM.workFilterItems.map(elt => {
            const { tags } = elt.dataset;
            const isVisible = this.search(tags, this.selectedDirection, this.selectedFilter);
            elt.classList.toggle('is-hidden', !isVisible);
        })

        this.DOM.casePreview?.map(el => el.classList.remove('is-visible'));
        this.DOM.setWorkDirection.map(el => el.classList.toggle('is-active', el.dataset.filter === this.selectedDirection))
        this.DOM.setWorkFilter.map(el => el.classList.toggle('is-active', el.dataset.filter === this.selectedFilter));
        this.DOM.workFilterLabel.innerText = this.selectedFilter || this.defaultFilterText;
        this.DOM.resetWorkFilter.classList.toggle('is-active', this.selectedFilter);

        setTimeout(() => {
            this.DOM.casePreview
                ?.filter(el => !el.parentElement.classList.contains('is-hidden'))
                .map((el, i) => {
                    el.classList.toggle('is-visible', i < 4)
                })

                window.scrollTo({
                    top: 0,
                    behavior: 'instant'
                });
        }, 50);
    }

    renderFilterState = (filter, showAll) => {
        this.DOM.casePreview?.map(el => el.classList.remove('is-visible'));
        this.DOM.workFilterItems.map(w => w.classList.toggle('is-hidden', showAll ? false : !this.filterEltsMap[filter].includes(w)));
        this.DOM.setWorkFilter.map(el => el.classList.toggle('is-active', el.dataset.filter === filter && !showAll));
        this.DOM.workFilterLabel.innerText = filter || this.defaultFilterText;

        this.DOM.resetWorkFilter.classList.toggle('is-active', !showAll);

        setTimeout(() => {
            this.DOM.casePreview
                ?.filter(el => !el.classList.contains('is-hidden'))
                .map((el, i) => el.classList.toggle('is-visible', i < 4))
        }, 50);

        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    }

    resetFilters = () => {
        this.DOM.resetWorkFilter.classList.remove('is-active');
        this.setFilter(false, true);
    }

    toggleFilterState = (state) => {
        if (!state) {
            const open = this.DOM.toggleWorkFilter.classList.toggle('is-active');
        }

        document.body.classList.toggle('is-filter-open');
    }

    validateFilter = (filter) => {
        const hasFilter = Object.entries(this.filterEltsMap).find(([key]) => {
            return key === filter;
        });

        return hasFilter?.[0] || false;
    }

    read = (cb = (() => {})) => {
        if (!this.DOM.workFilterItems) return;

        this.query = getQuery();

        if (!this.query) return;

        const shortFilter = Object.entries(this.query).map(([key, value]) => key).filter(key => ['new', 'branding', 'digital', 'strategy'].includes(key));

        if (shortFilter.length) {
            this.setFilterDirection(directionValues[shortFilter[0]]);
            cb();

            return;
        }

        const filterValue = decodeURIComponent(this.query.filter);
        const filter = filterValue ? this.validateFilter(filterValue) : false;
        this.setFilter(filter, false)
        cb();
    }
}

export default WorkFilter;