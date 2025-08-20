const VideoBlock = ({ data }) => {
    return <div class={ `case__block case__block--gallery ${data.dark_mode ? "inverse" : ""}` }>
        <section class="cases cases--full">
            <div class="cases__container">
                <div class="cases__list">
                    { data.reviews.map((r, i) => (
                        <div class="cases__item">
                            <div class="case-card-static">
                                <div class="case-card-static__row">
                                    <div class="case-card-static__col">
                                        <div class="case-card-static__preview">
                                            <video muted loop playsinline autoplay={ true } preload="auto" src={ r.video_link } type="video/mp4"></video>
                                        </div>
                                    </div>

                                    <div class="case-card-static__col">
                                        <div class="case-card-static__title">{ r.block_title }</div>
                                        <div class="case-card-static__text">{ r.block_description }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </section>
    </div>
}

export default VideoBlock;