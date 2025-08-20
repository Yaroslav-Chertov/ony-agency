const ShowreelBlock = ({ data }) => {
    return <div class="case__block case__block--gallery">
        <section class="media">
            <div class="media__container">
                <div class="media__wrap">
                    <div class="media__box">
                        <div class="video" data-elt="showreel">
                            <div class="video__container">
                                <div class="video__cover">
                                    <video class="video__video" src={ data.video_link } poster="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/shoereel.png"></video>
                                </div>

                                <div class="video__controls">
                                    <button class="video__play-btn" data-elt="playShowreel">
                                        <span>{ data.button_title }</span>
                                        <div class="video__play-icon">
                                            <svg class="svg-icon svg-icon--play" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-play"></use></svg>
                                            <svg class="svg-icon svg-icon--pause" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-pause"></use></svg>
                                        </div>
                                    </button>

                                    <div class="video__progress" data-elt="showreelProgress">
                                        <div class="video__progress-line"><span class="video__progress-line1"></span></div>
                                        {/* <div class="video__progress-line1"></div>
                                    <div class="video__progress-line2"></div> */}
                                    </div>

                                    <div class="video__time" data-elt="showreelTime">0:00 / 5:42</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default ShowreelBlock;