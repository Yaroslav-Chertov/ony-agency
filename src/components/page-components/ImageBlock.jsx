import { env } from '#_/server/utils/env.js';

const ImageBlock = ({ data }) => {
    // TODO: imageBlockCount
    // data-key={imageBlockCount}
    // data-elts="loadMedia"
    // src={env.BASE_URL + img.image} data-src={env.BASE_URL + img.image}
    return <div class="case__block case__block--gallery">
        <section class="media">
            <div class="media__container">
                <div class="media__wrap">
                    {data.block_images.map(img =>
                        <div class="media__box">
                            <img loading="lazy" src={env.BASE_URL + img.image}  alt="" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    </div>
}

export default ImageBlock;