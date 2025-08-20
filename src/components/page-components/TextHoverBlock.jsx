const TextHoverBlock = ({ data }) => {
    return <div class={`case__block case__block--content ${data.dark_mode ? "inverse" : ""}`}>
        <section class="infoblock infoblock--hover">
            <div class="infoblock__container">
                <div class="infoblock__list">
                    {data.reviews.map((d, i) => (
                        <div class="infoblock__item">
                            <div className="infoblock__box">
                                <h3 class="infoblock__title">{d.block_title}</h3>
                                <div class="infoblock__text"><p>{d.block_description}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
}

export default TextHoverBlock;
