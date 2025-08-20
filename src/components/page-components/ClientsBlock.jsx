const ClientsBlock = ({ data }) => {
    return <div class="case__block case__block--content">
        <section class="infoblock infoblock--api">
            <div class="infoblock__container">
                <div class="infoblock__row">
                    <div class="infoblock__col infoblock__col--side">
                        <h3 class="infoblock__title">{ data.title }</h3>
                    </div>

                    <div class="infoblock__col infoblock__col--main">
                        <div class="infoblock__links">
                            { data.description }
                        </div>

                        <div class="infoblock__more-btn">
                            <button class="more-btn" data-elts="toggleOpen" data-param="clients">
                                <span>Полный список</span>
                                <span>Скрыть список</span>
                                <svg class="svg-icon" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-cross"></use></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="more-content" data-elts="toggleOpenTarget" data-param="clients">
            <div class="more-content__container">
                <div class="more-content__wrap">
                    <div class="more-content__block">
                        <div class="more-clients">
                            <div class="more-clients__nav">
                                <button class="more-btn is-active" data-elts="tabControl" data-param="sort"><span>A–Я</span></button>
                                <button class="more-btn" data-elts="tabControl" data-param="industry"><span>Отрасль</span></button>
                            </div>

                            <div class="more-clients__tab is-active" data-elts="tabTarget" data-param="sort">
                                <div class="more-clients__wrap">
                                    <ul class="more-clients__list">
                                        { data.all_clients.filter(c => c.slug !== '/client/').map((d, i) =>
                                            <li class="more-clients__item"><a href={ d.slug } class="more-clients__link"><span>{ d.title }</span></a></li>
                                        ) }
                                    </ul>
                                </div>
                            </div>

                            <div class="more-clients__tab" data-elts="tabTarget" data-param="industry">
                                <div class="more-clients__wrap">
                                    { data.all_industries.filter(ind => ind.items.length).map((c, i) => {
                                        return <div class="more-clients__block">
                                            <div class="more-clients__title">{ c.title }</div>
                                            <ul class="more-clients__list">
                                                { c.items.map(item => <li class="more-clients__item"><a href={ item.slug } class="more-clients__link"><span>{ item.title }</span></a></li>) }
                                            </ul>
                                        </div>
                                    }) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default ClientsBlock;