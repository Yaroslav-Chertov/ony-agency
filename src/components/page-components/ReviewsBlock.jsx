import { env } from '#_/server/utils/env.js';

const ReviewsBlock = ({ data }) => {
    return <div class="case__block case__block--content">
        <section class="infoblock infoblock--reviews">
            <div class="infoblock__container">
                <div class="infoblock__row">
                    <div class="infoblock__col infoblock__col--side">
                        <div class="infoblock-author">
                            <div class="infoblock-author__img">
                                <img loading="lazy" src={env.BASE_URL + data.image} alt="" />
                            </div>

                            <div class="infoblock-author__name">{data.name}</div>
                            <div class="infoblock-author__position">{data.dolj}</div>
                        </div>
                    </div>

                    <div class="infoblock__col infoblock__col--main">
                        <div class="infoblock__title">{data.description}</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default ReviewsBlock;