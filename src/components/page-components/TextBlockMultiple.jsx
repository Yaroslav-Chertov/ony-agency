const TextBlockMultiple = ({ data }) => {
    return <div class={`case__block case__block--content ${data.dark_mode ? "inverse" : ""}`}>
        {data.title ? (<section class="infoblock">
            <div class="infoblock__container">
                <div class="infoblock__row">
                    <div class="infoblock__col infoblock__col--side">
                        <h3 class="infoblock__title">{data.title}</h3>
                    </div>

                    <div class="infoblock__col infoblock__col--main">
                        {data.numbers ? (<div class="infoblock__numbers">
                            <section class="info-num">
                                <div class="info-num__list">{data.description}</div>
                            </section>
                        </div>) : (<div class="infoblock__text body-l">{data.description}</div>)}
                    </div>
                </div>
            </div>
        </section>
        ) : (<section class="heading">
            <div class="heading__container">
                <h1 class="heading__title h1">
                    { data.description }
                </h1>
            </div>
        </section>)}
    </div>
}

export default TextBlockMultiple;