const RepeaterTextBlock = ({ data }) => {
    return <div class="case__block case__block--content">
        <section class="case-info case-info--content">
            <div class="case-info__container">
                <div class="case-info__wrap">
                    <div class="case-info__row">
                        <div class="case-info__col case-info__col--side">
                            <h3 class="case-info__subtitle">{data.title}</h3>
                        </div>

                        <div class="case-info__col case-info__col--main">
                            <div class="case-info__list">
                                {data.items.map((p,i) => {
                                    return <div class="case-info__item">
                                        <div class="case-info__subtitle">{p.block_text}</div>
                                        <div class="case-info__subtitle case-info__subtitle--position">{p.block_text_second}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default RepeaterTextBlock;