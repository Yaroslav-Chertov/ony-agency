import { env } from '#_/server/utils/env.js';
import { nl2br } from '#_/server/utils/nl2br.js';

const RepeaterCustomBlock = ({ data }) => {
    return <div class="case__block case__block--content">
        <section class="case-info">
            <div class="case-info__container">
                <div class="case-info__row">
                    <div class="case-info__col case-info__col--side">
                        <div class="case-info__media">
                            {data.block_images && data.block_images.length > 0 ? (
                                <img src={env.BASE_URL + data.block_images[0].image} alt="" />
                            ) : data.block_video_link ? (
                                <video src={env.BASE_URL + data.block_video_link} muted loop playsInline autoPlay preload="auto"></video>
                            ) : null}
                        </div>
                    </div>

                    <div class="case-info__col case-info__col--main">
                        <div class="case-info__list">
                            {data.items.map((p,i) => {
                                if (p.item_number == 12) {
                                    return (
                                        <div class="case-info__item case-info__item--full">
                                            <div class="case-info__title">{p.item_title}</div>
                                            <div class="case-info__tags">
                                                <div class="info-tags case-title">{nl2br(p.item_text)}</div>
                                            </div>
                                        </div>
                                    );
                                } else if (p.item_number == 6) {
                                    return (
                                        <div class="case-info__item">
                                            <div class="case-info__box">
                                                <div class="case-info__subtitle">{p.item_term}</div>
                                                <div class="case-info__text">{nl2br(p.item_text)}</div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div class="case-info__item">
                                            <div class="case-info__box">
                                                <div class="case-info__subtitle">{p.item_term}</div>
                                                <div class="case-info__text">{nl2br(p.item_text)}</div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default RepeaterCustomBlock;