const IframeBlock = ({ data }) => {
    return <div class="case__block case__block--gallery">
        <section class="media">
            <div class="media__container">
                <div class="media__wrap">
                    <div class="media__box">
                        {data.block_description}
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default IframeBlock;