import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import { env } from '#_/server/utils/env.js';

export default async ({ data }) => {
    const filter = data.filter;
    const client = data?.client?.title;
    const clientTitle = client ? client : Object.entries(data.filter.categories).map(([key, value], i, arr) => 
        <button class={'work__button btn-link '/*  + (key === '0' ? 'is-active' : '') */} data-elts="setWorkDirection" data-filter={value} data-key={key}>
            <span>{value}</span>{i === arr.length - 1 ? '.' : ','}
        </button>
    )
    const metaTags = {
        description: 'Примеры наших работ из самых разных сфер: Брендинг, Digital-решения, Стратегии | Заполните бриф на сайте или звоните +7(495)120-78-88',
        ogDescription: 'Примеры наших работ из самых разных сфер: Брендинг, Digital-решения, Стратегии | Заполните бриф на сайте или звоните +7(495)120-78-88',
    }

    return <Layout title="Проекты" bodyClass="is-filter-open-" attrs={{ 'data-route': 'work' }} meta={metaTags}>
        <div class="wrapper">
            <Header />

            <main class="main">
                <section class="work" data-elt="transitionContent">
                    <div class="work__container">
                        <div class="work__wrap">
                            <h1 class="work__title h1">
                                {clientTitle}
                            </h1>

                            {!client && <div class="work__filters">
                                <div class="work-filters">
                                    <div class="work-filters__button-container">
                                        <button class="work-filters__toggle" data-elt="toggleWorkFilter" type="button">
                                            <span data-elt="workFilterLabel">Фильтры</span>
                                        </button>

                                        <button class="work-filters__reset" data-elt="resetWorkFilter" type="button">
                                            <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-cross-l"></use></svg>
                                        </button>
                                    </div>

                                    <div class="work-filters__main">
                                        <div class="work-filters__container" data-elts="filterHeight">
                                            <div class="work-filters__block">
                                                <div class="work-filters__row">
                                                    <div class="work-filters__col">
                                                        <div class="work-filters__title">Тип клиента</div>
                                                    </div>
                                                    <div class="work-filters__col">
                                                        <ul class="work-filters__list">
                                                            {filter.type_clients.map((item, i) => (
                                                                <li class="work-filters__item" key={i}>
                                                                    <a href={'#' + item} class="work-filters__link" data-elts="setWorkFilter" data-filter={item}>
                                                                        <span>{item}</span>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="work-filters__block">
                                                <div class="work-filters__row">
                                                    <div class="work-filters__col">
                                                        <div class="work-filters__title">Тип работ</div>
                                                    </div>
                                                    <div class="work-filters__col">
                                                        <ul class="work-filters__list">
                                                            {Object.entries(filter.type_works).map(([key, value], i) => (
                                                                <li class="work-filters__item" key={i}>
                                                                    <a href={'#' + value} class="work-filters__link" data-elts="setWorkFilter" data-filter={value}>
                                                                        <span>{value}</span>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            {data.projects.length ? <div class="work__list">
                                {data.projects/* .filter(c => (c.video_link || c.image)) */.map((card, i) => (
                                    <div class="work__item" data-elts="workFilterItems" data-tags={card.tags}>
                                        <a href={'/work/' + card.slug} class={'case-card case-card--mini ' + (i < 4 ? 'is-visible' : '')} data-elts={'casePreview'} data-type="works" data-key={i}>
                                            <div class="case-card__preview">
                                                {card.image
                                                    ? <img data-key={i} data-elts="loadMedia-" loading={'lazy'} src={env.BASE_URL + card.image} alt={card.title} />
                                                    : <video data-elts="loadMedia" muted loop playsinline autoplay={i <= 4} preload={i <= 4 ? 'auto' : 'meta'} src={card.video_link}></video>
                                                }
                                            </div>
                                            <div class="case-card__title">{card.title}</div>
                                            <div data-elts="caseHoverTitle" d-title={card.title_hover} class="case-card__head no-opacity"><div>{card.title_hover}</div></div>
                                        </a>
                                    </div>
                                ))}
                            </div> : ''}

                            {!data.projects.length && <div class="work__empty">В данный момент нет проектов, связанных с&nbsp;этим клиентом, которые мы могли бы показать</div>}
                        </div>
                    </div>
                </section>
            </main>
        </div>

    </Layout>
}

