import { env } from '#_/server/utils/env.js';

const ReviewsBlockList = ({ data }) => {
    return <div class="case__block case__block--content">
        <section class="infoblock infoblock--reviews">
            <div class="infoblock__container">
                <div class="infoblock__row">
                    <div class="infoblock__col infoblock__col--side">
                        <div class="infoblock__title">{data.element_title}</div>
                    </div>

                    <div class="infoblock__col infoblock__col--main">
                        <div class="infoblock__list">
                            {data.reviews.map((r,i) => (
                                <div class="infoblock__item">
                                    <div class="infoblock-author infoblock-author--logo">
                                        <div class="infoblock-author__img">
                                            <img loading="lazy" src={env.BASE_URL + r.image_path} alt="" />
                                        </div>

                                        <div class="infoblock-author__name">{r.name}</div>
                                        <div class="infoblock-author__position">{r.dolj}</div>
                                    </div>

                                    <div class="infoblock__title">{r.block_description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default ReviewsBlockList;