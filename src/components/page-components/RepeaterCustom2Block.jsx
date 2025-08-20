import { nl2br } from '#_/server/utils/nl2br.js';

const RepeaterCustom2Block = ({ data }) => {
    return <div class="case__block case__block--content">
        <section class="case-info case-info--custom2">
            <div class="case-info__container">
                {data.items.map((p, i) => {
                    return (
                        <div class="case-info__box" key={i}>
                            <div class="case-info__row">
                                <div class="case-info__col case-info__col--side">
                                    <div class="case-info__subtitle">{p.item_term}</div>
                                </div>

                                <div class="case-info__col case-info__col--main">
                                    <div class="case-info__text">{nl2br(p.item_text)}</div>

                                    {p.item_title && (
                                        <div class="case-info__tags">
                                            <div class="info-tags case-title">{p.item_title}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    </div>
}

export default RepeaterCustom2Block;