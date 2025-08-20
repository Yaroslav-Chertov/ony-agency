const VideoBlock = ({ data, key }) => {
    // TODO: data-key="0" data-elts="loadMedia"
    // src="/assets/case/samolet/03.jpg" data-src="/assets/case/samolet/03_full.png"
    // autoplay={false} preload="none"
    return <div class={`case__block case__block--gallery ${data.dark_mode ? "inverse" : ""}`}>
        <section class="media">
            <div class="media__container">
                <div class="media__wrap">
                    <div class="media__box">
                        <video data-elts="loadMedia" muted loop playsinline preload="meta" src={data.block_video_link} type="video/mp4"></video>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default VideoBlock;