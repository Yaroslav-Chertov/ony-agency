import { nl2br } from '#_/server/utils/nl2br.js';

const TextBlock = ({ data }) => {
    return <div class="case__block case__block--content" data-name="TextBlock">
        <section class="infoblock infoblock--case">
            <div class="infoblock__container">
                <div class="infoblock__row">
                    <div class="infoblock__col infoblock__col--side">
                        <h3 class="infoblock__title">{data.block_title}</h3>
                    </div>

                    <div class="infoblock__col infoblock__col--main">
                        <div class="infoblock__text"><p>{nl2br(data.block_description)}</p></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default TextBlock;